<template>
	<aside class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
			<div class="flex items-center flex-shrink-0 px-4">
				<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
					alt="Workflow" />
			</div>
			<div class="mt-5 flex-grow flex flex-col">
				<nav class="flex-1 px-2 pb-4 space-y-1">
					<div v-for="(items, idx) in sidebarNav" :key="idx">
						{{ items.title.toUpperCase() }}
						<template v-for="item in items.links" :key="item.name">
							<ul v-if="item.links" class="space-y-2" :href="item.href">
								<li>
									<Menu as="div" class="relative inline-block text-left">
										<div>
											<MenuButton
												class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
												{{item.name}}
												<ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
											</MenuButton>
										</div>

										<transition enter-active-class="transition ease-out duration-100"
											enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
											leave-active-class="transition ease-in duration-75"
											leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
											<MenuItems
												class="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
												<div class="py-1">
													<MenuItem v-for="link in item.links" v-slot="{ active }">
													<!-- <NuxtLink :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']"
														:to="item.href">
														{{ item.name }}
													</NuxtLink> -->
													<a :href="link.href"
														:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
														{{ link.name }} {{ link.href }}
													</a>
													</MenuItem>
												</div>
											</MenuItems>
										</transition>
									</Menu>
								</li>
							</ul>
							<Menu v-else>
								<div class="py-1">
									<MenuItem v-slot="{ active }">
									<a href="#"
										:class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
										{{ item.name }}
									</a>
									</MenuItem>
								</div>
							</Menu>
						</template>
					</div>
				</nav>
			</div>
		</div>
	</aside>
</template>

<script setup>

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/solid'

const props = defineProps({
	sidebarNav: {
		type: [Array],
	}
})

const sidebarNav = ref(props.sidebarNav)

</script>
