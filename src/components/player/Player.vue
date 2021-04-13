<template>
	<div class="player" ref="player">
		
	</div>
</template>

<script>
	import Player from 'xgplayer'
	export default {
		name: 'Player',
		props: [],
		mounted() {
			this.initPlayer();
		},
		methods: {
			initPlayer() {
				let player = new Player({
				  el: this.$refs.player,
				  url: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7cdabcaa763392c86b944eaf4e68d6a3.mp4'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
</style>
