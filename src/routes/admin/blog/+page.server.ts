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
	default: async ({ request, platform }) => {

		let formData = await request.formData();
		let postDate = new Date().toString();
		let title = formData.get("title");
		let body = formData.get("body");

		if (!title || !body) {
			return {
				error: "Blog post must have a title and body"
			};
		}


		try {
			const query = `
INSERT INTO POSTS(date,title,content) values(?,?,?)
		`;

			const res = await platform.env.halliday_db
				.prepare(query)
				.bind(postDate, title, body)
				.all();
		} catch (err) {
			console.error('Error querying D1 sessions:', err);
			return {
				error: "Unexpected error submitting blog post"
			};
		}



	},
};
