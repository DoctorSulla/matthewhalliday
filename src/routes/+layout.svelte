<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	const routes: { [key: string]: string } = {
		'/': 'Home',
		'/photos': 'Photos',
		'/about': 'About',
		'/blog': 'Blog'
	};

	let { children } = $props();
</script>

<svelte:head>
	<title
		>{page.route.id && routes[page.route.id] ? routes[page.route.id] + ' | ' : ''}Matthew Halliday</title
	>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<nav class="mb-2 flex bg-purple-50 py-2">
	{#each Object.entries(routes) as [link, text]}
		<a
			class="mukta-regular mx-0.5 px-2 text-xl text-violet-500 hover:rounded-2xl hover:bg-purple-200 {page
				.route.id == link
				? 'rounded-2xl bg-purple-200'
				: ''}"
			href={link}>{text}</a
		>
	{/each}
</nav>

<h1 class="text-center text-3xl text-purple-500">
	{page.route.id && routes[page.route.id] ? routes[page.route.id] : ''}
</h1>
<main class="m-auto max-w-6xl px-1">
	{@render children?.()}
</main>
