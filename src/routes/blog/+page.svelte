<script lang="ts">
	import type { Post } from '$lib/types';
	import type { PageData } from './$types';

	//let { data }: PageProps = $props();
	export let data: PageData;
</script>

<h1>Blog</h1>
<div>{JSON.stringify(data)}</div>
