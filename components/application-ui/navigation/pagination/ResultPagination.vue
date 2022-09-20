<script>
export default {
	props: ['results'],
	data() {
		return { results: this.results }
	}
}
</script>

<template>
	<div class="hidden sm:block">
		<p class="text-sm text-gray-700">
			Showing
			{{ ' ' }}
			<span class="font-medium">1</span>
			{{ ' ' }}
			to
			{{ ' ' }}
			<span class="font-medium">10</span>
			{{ ' ' }}
			of
			{{ ' ' }}
			<span class="font-medium">20</span>
			{{ ' ' }}
			results
		</p>
	</div>
</template>