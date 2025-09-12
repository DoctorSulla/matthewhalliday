import { isAuthed } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

export async function load({ cookies, platform }) {
	if (!platform) {
		redirect(307, '/login');
	}

	if (!(await isAuthed(cookies, platform))) {
		redirect(307, '/login');
	}
}

export const actions = {
	default: async ({}) => {
		// NO OP
	}
};
