<script>
export default {
  props: ['json'],
	data () {
		return { items: this.json.result.data }
	}
}
</script>

<template>
	<section>
		<div class="card widget-flat">
			<div class="card-body">
				<h5 class="card-title">Items</h5>
				<p class="card-text">
					<ul class="list-group">
						<li v-for="item in items" class="list-group-item">
							<NuxtLink :to="'/vendables/items/' + item._id" class="list-group-item-action">
								<div class="row">
									<div class="col-md-6">{{ item._id }}</div>
									<div class="col-md-6">{{ item.title }}</div>
								</div>
							</NuxtLink>
						</li>
					</ul>
				</p>
			</div>
		</div>
	</section>
</template>