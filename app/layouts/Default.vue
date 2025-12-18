<template>
	<div class="container mx-auto max-w-4xl">
		<AppHeader />
		<main class="my-10">
			<slot />
		</main>
	</div>
</template>

<style>
	@reference "tailwindcss";

	body {
		@apply dark:bg-gray-900 bg-white;
	}
</style>