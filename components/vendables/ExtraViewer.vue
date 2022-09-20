<script>
export default {
  props: ['json'],
	data () {
		return { extras: this.json.result.data }
	}
}
</script>

<template>
	<section>
		<div class="card widget-flat">
			<div class="card-body">
				<h5 class="card-title">Extras</h5>
				<p class="card-text">
					<ul class="list-group">
						<li v-for="extra in extras" class="list-group-item">
							<NuxtLink :to="'/vendables/extras/' + extra._id" class="list-group-item-action">
								<div class="row">
									<div class="col-md-6">{{ extra._id }}</div>
									<div class="col-md-6">{{ extra.title }}</div>
								</div>
							</NuxtLink>
						</li>
					</ul>
				</p>
			</div>
		</div>
	</section>
</template>