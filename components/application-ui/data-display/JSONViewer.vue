<script>
export default {
	props: ['json']
}
</script>

<template>
	<layout-panels-card>
		<template v-slot:body>
			<pre>{{ json }}</pre>
		</template>
	</layout-panels-card>
</template>