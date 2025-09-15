<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

{data.page}

<form method="POST">
	<input
		class="my-5 block w-9/12 border-1 border-solid p-1"
		type="text"
		name="title"
		id="title"
		placeholder="Title"
		value={data.title}
	/>
	<textarea class="block h-72 w-9/12 border-1 border-solid p-1" name="content" id="content"
		>{data.content}</textarea
	>
	<input type="hidden" name="id" value={data.id} />
	<button
		class="my-2 cursor-pointer rounded-xl border-1 border-solid bg-gray-100 p-2 hover:bg-gray-300"
		type="submit">Update Post</button
	>
</form>
