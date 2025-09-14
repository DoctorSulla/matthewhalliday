<script lang="ts">
	import type { Post } from '$lib/types';
	import type { PageData } from './$types';
	import BlogPost from '$lib/BlogPost.svelte';
	export let data: PageData;

	let posts: Array<Post> = data.posts;
</script>

{#each posts as post}
	<BlogPost {post} />
{/each}
