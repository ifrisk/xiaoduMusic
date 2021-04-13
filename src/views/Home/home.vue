<template>
	<keep-alive>
		<div class="home">
			<carousel class="banner wrap"></carousel>
			<p class="font-blod wrap">推荐歌单</p>
			<song-sheet-cart class="wrap"></song-sheet-cart>
			<p class="font-blod wrap">最新音乐</p>
			<latest-music class="wrap"></latest-music>
			<p class="font-blod wrap">推荐MV</p>
			<recommend-mv class="wrap"></recommend-mv>
		</div>
	</keep-alive>
</template>

<script>
	import Carousel from "@/components/common/Carousel.vue"
	import songSheetCart from "@/components/songSheetCart/songSheetCart.vue"
	import latestMusic from "@/components/latestMusic/latestMusic.vue"
	import recommendMv from "@/components/recommendMv/recommendMv.vue"
	export default {
		name: 'home',
		components: {
			Carousel,
			songSheetCart,
			latestMusic,
			recommendMv
		}
	}
</script>

<style lang="less" scoped>
	.home {
		width: 80%;
		margin: 0 auto;
	}
	.banner {
		margin-top: 25px;
	}
	.font-blod {
		font-size: 20px;
		color: var(--main-font-color);
		padding: 15px 0;
	}
</style>
