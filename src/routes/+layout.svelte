<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="flex">
<a class="text-violet-500 px-1" href="#">Home</a>
<a  class="text-violet-500 px-1" href="#">Photos</a>
<a class="text-violet-500 px-1" href="#">About Me</a>
</nav>
<main class="w-6xl m-auto">
{@render children?.()}
</main>
