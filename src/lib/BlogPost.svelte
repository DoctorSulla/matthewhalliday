<script lang="ts">
	import type { Post } from '$lib/types';
	let { post }: { post: Post } = $props();
	const options = {
		weekday: 'short',
		year: '2-digit',
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};
	const dateFormat = new Intl.DateTimeFormat('en-GB', options);

	function formatDate(unformattedDate: string): string {
		let date = new Date(unformattedDate);
		if (date.toString() == 'Invalid Date') {
			return '';
		}
		let formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		return formattedDate;
	}
</script>

<div class="my-2">
	<h1 class="text-3xl font-bold text-red-300">{post.title}</h1>
	<span class="italic"
		>{new Date(post.date).toString() == 'Invalid Date'
			? ''
			: dateFormat.format(new Date(post.date))}</span
	>
	<p>{@html post.content}</p>
</div>
<a href="/" class="hidden">CSS Hack</a>

<style>
	p {
		margin: 10px 0;
	}
	a {
		color: blue;
		text-decoration: underline;
	}
</style>
