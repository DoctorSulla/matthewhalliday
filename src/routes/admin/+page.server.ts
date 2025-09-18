import { isAuthed } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, platform }) {
	if (!platform) {
		redirect(303, '/login');
	}

	if (!(await isAuthed(cookies, platform))) {
		redirect(303, '/login');
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		let formData = await request.formData();

		if (formData.get('logout')) {

			cookies.set('loggedIn', '', {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: -3600
			});
		}
	}
};
