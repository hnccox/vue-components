<!-- This example requires Tailwind CSS v2.0+ -->
<template>
	<nav class="flex" aria-label="Breadcrumb">
		<ol role="list" class="flex items-center space-x-4">
			<li>
				<div>
					<a href="#" class="text-gray-400 hover:text-gray-500">
						<HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
						<span class="sr-only">Home</span>
					</a>
				</div>
			</li>
			<li v-for="page in pages" :key="page.name">
				<div class="flex items-center">
					<svg class="h-5 w-5 flex-shrink-0 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
						viewBox="0 0 20 20" aria-hidden="true">
						<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
					</svg>
					<a :href="page.href" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
						:aria-current="page.current ? 'page' : undefined">{{ page.name }}</a>
				</div>
			</li>
		</ol>
	</nav>
</template>

<script setup lang="ts">
// import { HomeIcon } from '@heroicons/vue/20/solid'

export type Page = {
	name: string,
	href: string,
	current: boolean,
}

const props = defineProps<{
	pages: Array<Page>
}>()

const pages = props.pages
</script>