import { redirect } from '@sveltejs/kit';
import { createHash, randomBytes } from 'crypto';

export async function load({ cookies, platform }) {
	let cookie_value = cookies.get('loggedIn');
	let check = checkCookie(cookie_value, platform);
	if (check) {
		redirect(307, '/admin');
	}
}

export const actions = {
	default: async ({ cookies, request, platform }) => {
		let formData = await request.formData();

		// Obviously this is not secure in any way but currently an admin can't actually do anything
		// TODO store random session id in the db and then compare it to the one in the cookie
		if (
			createHash('sha256').update(formData.get('adminPassword')).digest('hex') ==
			'61f5961b351e24b3719aab41655dc5d433f169e98cfe99ed379b5bac187ef09e'
		) {
			let key = randomKey();
			await storeSession(key, platform);
			cookies.set('loggedIn', key, { path: '/' });
		}
	}
};

function randomKey(): string {
	let bytes = Buffer.from(randomBytes(128)).toString('base64');
	return bytes;
}

async function checkCookie(cookie_value: string, platform): boolean {
	try {
		const query = `
SELECT * FROM SESSIONS WHERE session_token=?
		`;

		const res = await platform.env.halliday_db.prepare(query).bind(cookie_value).all();
		if (res.results[0].expiry > new Date().getTime()) {
			return true;
		}
		return false;
	} catch (err) {
		console.error('Error querying D1 sessions:', err);
		return false;
	}
}

async function storeSession(session_key: string, platform) {
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
