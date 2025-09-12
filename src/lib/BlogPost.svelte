<script lang="ts">
	import type { Post } from '$lib/types';
	let { post }: { post: Post } = $props();

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
	<span class="italic">{formatDate(post.date)}</span>
	<p class="text-xl">{@html post.content}</p>
</div>
