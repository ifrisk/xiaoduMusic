<template>
	<div>
		<div class="song-sheet wrap">
			<div class="song-sheet-cart" v-for="(item, index) in cartData">
				<div class="sheet-header">{{ item.copywriter }}</div>
				<div class="img"><img :src="item.picUrl"></div>
				<p>{{ item.name }}</p>
				<div class="button"><i class="el-icon-caret-right"></i></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { recommendedSongList } from "@/network/home.js"
	export default {
		name: 'songSheetCart',
		data() {
			return {
				cartData: []
			}
		},
		created() {
			recommendedSongList().then(res => {
				this.cartData = res.data.result;
				// console.log(res)
			})
			.catch((res) => {
				this.$message("加载失败~");
			})
		}
	}
</script>

<style lang="less" scoped>
	.song-sheet {
		height: 550px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.song-sheet-cart {
		width: 192px;
		height: 192px;
		position: relative;
		cursor: pointer;
	}
	.song-sheet-cart .img{
		width: 100%;
		height: 100%;
		border-radius: 5px;
		overflow: hidden;
	}
	.sheet-header {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 0;
		color: var(--white);
		font-size: var(--small-font-size);
		background-color: rgba(0,0,0,.4);
		display: flex;
		align-items: center;
		padding: 0 5px;
		box-sizing: border-box;
		overflow: hidden;
		transition: all .3s;
	}
	.song-sheet-cart p{
		margin: 0;
		margin-top: 10px;
		color: var(--routine-font-color);
		cursor: pointer;
	}
	.song-sheet-cart img {
		width: 100%;
		height: 100%;
	}
	.song-sheet-cart:hover .sheet-header {
		height: 50px;
	}
	.button {
		position: absolute;
		background-color: var(--blue-hover-bgcolor);
		opacity: 0;
		width: 40px;
		height: 40px;
		right: 10px;
		bottom: 10px;
		border-radius: 50%;
		font-size: 25px;
		text-align: center;
		line-height: 40px;
		color: var(--blue);
		transition: all .3s;
	}
	.song-sheet-cart:hover .button {
		opacity: .6;
	}
</style>
