<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Matthew Halliday.dev</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<nav class="mb-2 flex bg-purple-50 py-2">
	<a class="mukta-regular px-2 text-xl text-violet-500 hover:underline" href="/">Home</a>
	<a class="mukta-regular px-2 text-xl text-violet-500 hover:underline" href="/photos">Photos</a>
	<a class="mukta-regular px-2 text-xl text-violet-500 hover:underline" href="/about">About Me</a>
	<a class="mukta-regular px-2 text-xl text-violet-500 hover:underline" href="/blog">Blog</a>
</nav>
<main class="m-auto max-w-6xl px-1">
	{@render children?.()}
</main>
