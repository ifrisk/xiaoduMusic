<template>
	<el-carousel :interval="4000" type="card" height="213px" class="banner">
		<el-carousel-item v-for="(item, index) in banner" :key="index">
			<img :src="item.imageUrl" alt="">
		</el-carousel-item>
	</el-carousel>
</template>

<script>
	import { homeBanner } from "../../network/home.js"
	export default {
		name: 'Carousel',
		data() {
			return {
				// banner
				banner: {}
			}
		},
		created() {
			homeBanner().then(res => {
				this.banner = res.data.banners
			})
		}
	}
</script>

<style lang="less" scoped>
	
	.el-carousel__item {
		border-radius: 5px !important;
	}
	.el-carousel__item img {
		height: 100%;
		width: 100%;
	}
</style>
