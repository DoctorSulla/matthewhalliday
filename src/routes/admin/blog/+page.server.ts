import { checkCookie } from '$lib/server/auth';
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, platform }) {

	if (!platform) {
		redirect(307, '/login');
	}

	let cookie_value = cookies.get('loggedIn');

	if (!cookie_value || (!await checkCookie(cookie_value, platform))) {
		redirect(307, '/login');
	}
}

export const actions = {
	default: async ({ }) => {
		// NO OP
	},
};
