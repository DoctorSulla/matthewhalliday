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

export const actions = {
	default: async ({ request, cookies, platform }) => {
		if (!(await isAuthed(cookies, platform))) {
			redirect(307, '/login');
		}
		let formData = await request.formData();
		let title = formData.get('title');
		let content = formData.get('content');
		let id = formData.get('id');

		if (parseInt(id) == "NaN" || parseInt(id) < 1) {
			return {
				error: 'Id must be a positive integer'
			}
		}

		if (!title || !content) {
			return {
				error: 'Blog post must have a title and body'
			};
		}

		try {
			const query = `
UPDATE POSTS set title=?, content=? WHERE id=?
		`;

			const res = await platform.env.halliday_db
				.prepare(query)
				.bind(title, content, id)
				.all();
			return {
				message: 'Blog post updated successfully'
			}
		} catch (err) {
			console.error('Error querying D1 sessions:', err);
			return {
				error: 'Unexpected error updating blog post'
			};
		}
	}
};
