import type { PageServerLoad } from "./$types";

import type { Post } from "$lib/types";

export const load: PageServerLoad = async ({ platform }) => {
	// Defensive: if platform or the D1 binding isn't available, return an empty list.
	if (!platform?.env?.halliday_db) {
		console.warn(
			"D1 database binding `halliday_db` not found on platform.env",
		);
		return { posts: [] as Post[] };
	}

	try {
		const query = `
			SELECT id, date, title, content
			FROM posts
			ORDER BY date DESC
		`;

		const res = await platform.env.halliday_db.prepare(query).all();

		const posts: Post[] = Array.isArray(res.results)
			? (res.results as Post[])
			: [];

		return { posts };
	} catch (err) {
		console.error("Error querying D1 posts:", err);
		return { posts: [] as Post[] };
	}
};
