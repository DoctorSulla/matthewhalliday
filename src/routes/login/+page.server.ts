import { redirect } from '@sveltejs/kit';
import { randomBytes, scryptSync } from 'crypto';
import type { RequestEvent } from '@sveltejs/kit';
import { checkCookie } from '$lib/server/auth';

interface SessionRow {
	user: string;
	expiry: number;
	session_token: string;
}

export async function load({ cookies, platform }) {
	if (!platform) {
		return {
			error: 'Platform is not defined'
		};
	}
	let cookie_value = cookies.get('loggedIn');
	if (cookie_value && (await checkCookie(cookie_value, platform))) {
		redirect(307, '/admin');
	}
}

export const actions = {
	default: async ({ cookies, request, platform }: RequestEvent) => {
		if (!platform || !platform.env) {
			return {
				error: 'Platform is not defined'
			};
		}
		let formData = await request.formData();

		let saltString = await platform.env.salt.get('salt', { type: 'text' });
		if (!saltString) {
			return {
				error: 'Processing error'
			};
		}
		let salt = new Uint8Array(saltString.split(',').map((v: string) => Number(v)));
		let hashedPassword = await platform.env.hashed_password.get('hashed_password', {
			type: 'text'
		});

		let submittedPassword = formData.get('adminPassword');

		if (!submittedPassword || typeof submittedPassword !== 'string') {
			return {
				error: 'Invalid password format'
			};
		}

		let derivedKey = scryptSync(submittedPassword, salt, 64);
		if (derivedKey.toString('hex') === hashedPassword) {
			let key = randomKey();
			await storeSession(key, platform);
			cookies.set('loggedIn', key, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 86400
			});
		} else {
			return {
				error: 'Invalid password'
			};
		}
	}
};

function randomKey(): string {
	let bytes = Buffer.from(randomBytes(128)).toString('base64');
	return bytes;
}

async function storeSession(session_key: string, platform: App.Platform) {
	try {
		const expiry = new Date().getTime() + 3600 * 24 * 1000;
		const query = `
INSERT INTO SESSIONS(user,expiry,session_token) values(?,?,?)
		`;

		const res = await platform.env.halliday_db
			.prepare(query)
			.bind('admin', expiry, session_key)
			.all();
	} catch (err) {
		console.error('Error querying D1 sessions:', err);
	}
}
