import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
	if (cookies.get('loggedIn') != 'true') {
		redirect(307, "/login");
	}
}

