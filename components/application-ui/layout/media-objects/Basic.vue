<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex">
    <div v-if="$slots.img" class="mr-4 flex-shrink-0">
			<slot name="img"></slot>
    </div>
    <div>
      <h4 v-if="$slots.title" class="text-lg font-bold"><slot name="title"></slot></h4>
      <p v-if="$slots.text" class="mt-1"><slot name="text"></slot></p>
    </div>
  </div>
</template>