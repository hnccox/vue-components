<script setup>
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
</script>

<script>
export default {
  props: ['json'],
	computed: {
			menus() {
				return this.json.result.data
			},
			pagination() { 
				var cursor = Object.assign({}, this.json.result); 
				delete cursor.data; 
				return cursor;
			}
	}
}
</script>

<template>
	<section>
		<layout-panels-card>
			<template v-slot:header>Menus</template>
			<template v-slot:body>
				<ul class="list-group">
					<li v-for="menu in menus" class="list-group-item flex">
						<NuxtLink :to="'/vendables/menus/' + menu._id" class="list-group-item-action">
							<div class="row">
								<div class="col-md-6">{{ menu._id }}</div>
								<div class="col-md-6">{{ menu.title }}</div>
							</div>
						</NuxtLink>
					</li>
				</ul>
				<br />
				<UiCursorPagination :pagination="pagination"></UiCursorPagination>
			</template>
		</layout-panels-card>
	</section>

</template>

<style>
.card {
	@apply relative flex flex-col min-w-0 break-words bg-white bg-clip-border border border-solid rounded
}

.card-body {
	@apply flex-auto p-5
}

.card-title {
	@apply mb-3
}

.list-group {
	@apply flex flex-col
}

.list-group-item {
	@apply relative block bg-white border border-solid py-3 px-5
}

.row {
	@apply flex flex-wrap
}

.col-md-6 {
	@apply flex-grow-0 flex-shrink-0 basis-auto w-1/2
}
</style>