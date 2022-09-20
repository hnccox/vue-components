<script>
export default {
  props: ['json'],
	data () {
		return { products: this.json.result.data }
	}
}
</script>

<template>
	<section>
		<div class="card widget-flat">
			<div class="card-body">
				<h5 class="card-title">Products</h5>
				<p class="card-text">
					<ul class="list-group">
						<li v-for="product in products" class="list-group-item">
							<NuxtLink :to="'/vendables/products/' + product._id" class="list-group-item-action">
								<div class="row">
									<div class="col-md-6">{{ product._id }}</div>
									<div class="col-md-6">{{ product.title }}</div>
								</div>
							</NuxtLink>
						</li>
					</ul>
				</p>
			</div>
		</div>
	</section>
</template>