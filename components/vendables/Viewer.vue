<script>
export default {
  props: ['json'],
	data () {
		return {
			vendable: this.json.result
		}
	},
}
</script>

<template>
	<layout-panels-card>
			<template v-slot:header></template>
			<template v-slot:body>
				<layout-media-objects-basic>
					<template v-slot:img>{{vendable.imgUrl}}</template>
					<template v-slot:title>{{vendable.title}}</template>
					<template v-slot:text>{{vendable.description}}</template>
				</layout-media-objects-basic>
			</template>
	</layout-panels-card>
</template>