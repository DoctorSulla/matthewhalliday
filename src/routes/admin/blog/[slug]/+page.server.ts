import type { PageServerLoad } from "./$types";
import { redirect } from '@sveltejs/kit';
import { isAuthed } from '$lib/server/auth';

import { error } from '@sveltejs/kit';
export const load: PageServerLoad = async ({ params, platform, cookies }) => {
	if (!await isAuthed(cookies, platform)) {

		redirect(307, '/login');
	}

	try {
		const query = `SELECT id,date,title,content from POSTS where id=?`;

		const res = await platform.env.halliday_db
			.prepare(query)
			.bind(params.slug)
			.all();


		if (res.results.length > 0) {
			return res.results[0]
		}
		else {
			error(404);
		}
	} catch (err) {
		error(500);
	}
}
