import type { PageServerLoad } from './$types';

import type { Post } from '$lib/types';

export const load: PageServerLoad = async ({ platform }) => {
	// Defensive: if platform or the D1 binding isn't available, return an empty list.
	if (!platform?.env?.halliday_db) {
		// During local development with `wrangler dev`, platform should be available.
		// If it's not, return an empty posts array so the page can still render.
		console.warn('D1 database binding `halliday_db` not found on platform.env');
		return { posts: [] as Post[] };
	}

	try {
		// Select the columns you want. Adjust ORDER BY / LIMIT as you need.
		const query = `
			SELECT id, date, title, content
			FROM posts
			ORDER BY date DESC
		`;

		// Use `.all()` for SELECT queries on D1 (returns { results, meta }).
		const res = await platform.env.halliday_db.prepare(query).all();

		const posts: Post[] = Array.isArray(res.results) ? (res.results as Post[]) : [];

		return { posts };
	} catch (err) {
		// Log and return an empty list so the page doesn't crash.
		console.error('Error querying D1 posts:', err);
		return { posts: [] as Post[] };
	}
};
