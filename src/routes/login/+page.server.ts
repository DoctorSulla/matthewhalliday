import { redirect } from '@sveltejs/kit';
export function load({ cookies }) {
	if (cookies.get('loggedIn') == 'true') {
		redirect(307, "/admin");
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		let formData = await request.formData();

		// Obviously this is not secure in any way but currently an admin can't actually do anything
		if (formData.get('adminPassword') == "SuperSecret") {
			cookies.set('loggedIn', 'true', { path: '/' });
		}
	}
}
