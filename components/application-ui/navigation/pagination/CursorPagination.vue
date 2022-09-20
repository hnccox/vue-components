<script>
export default {
	props: ['pagination'],
	data() {
		return {
			pagination: this.pagination,
			path: this.pagination.path,
			per_page: this.pagination.per_page,
			next_cursor: this.pagination.next_cursor,
			next_page_url: this.pagination.next_page_url,
			prev_cursor: this.pagination.prev_cursor,
			prev_page_url: this.pagination.prev_page_url
		}
	}
}
</script>

<template>
	<nav class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
		aria-label="Pagination">
		<UiResultPagination :pagination="pagination"></UiResultPagination>
		<div class="flex-1 flex justify-between sm:justify-end">
			<a :href="pagination.prev_page_url" :disabled="!pagination.prev_cursor"
				:class="[!pagination.prev_cursor ? 'bg-gray-50' : 'bg-white hover:bg-gray-50', 'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700']">
				Previous </a>
			<a :href="pagination.next_page_url" :disabled="!pagination.next_cursor"
				:class="[!pagination.next_cursor ? 'bg-gray-50' : 'bg-white hover:bg-gray-500' ,'ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700']">
				Next </a>
		</div>
	</nav>
</template>
