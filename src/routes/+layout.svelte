<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="flex">
	<a class="px-1 text-violet-500" href="/">Home</a>
	<a class="px-1 text-violet-500" href="/photos">Photos</a>
	<a class="px-1 text-violet-500" href="/about">About Me</a>
</nav>
<main class="m-auto w-6xl">
	{@render children?.()}
</main>
