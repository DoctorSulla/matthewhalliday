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
	default: async ({ request, cookies, platform }) => {
		if (!(await isAuthed(cookies, platform))) {
			redirect(307, '/login');
		}
		let formData = await request.formData();
		let postDate = new Date().toString();
		let title = formData.get('title');
		let content = formData.get('body');

		if (!title || !content) {
			return {
				error: 'Blog post must have a title and body'
			};
		}

		try {
			const query = `
INSERT INTO POSTS(date,title,content) values(?,?,?)
		`;

			const res = await platform.env.halliday_db
				.prepare(query)
				.bind(postDate, title, content)
				.all();
		} catch (err) {
			console.error('Error querying D1 sessions:', err);
			return {
				error: 'Unexpected error submitting blog post'
			};
		}
	}
};
