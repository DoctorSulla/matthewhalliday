<script lang="ts">
	export let form;
</script>

<h1 class="text-center text-3xl text-purple-500">Admin Login</h1>
<form method="post" action="?/submit">
	<input class="border-1" type="password" name="adminPassword" id="adminPassword" />
	<button class="cursor-pointer rounded-md bg-gray-300 p-1" type="submit">Login</button>
</form>

<div class={form && form.error ? 'mt-2 w-fit rounded-xl bg-red-400 p-2 text-red-900' : 'hidden'}>
	{form?.error || ''}
</div>
