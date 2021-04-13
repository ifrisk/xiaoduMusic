<template>
	<div>
		<el-col :span="6" 
			v-for="(item, index) in mvData" 
			:key="index"
			class="recommend-mv"
			@click.native="mvClick(item.id)">
			<div class="play-volume">{{ item.playCount }}</div>
			<div class="mvCard">
				<img :src="item.picUrl">
			</div>
			<p class="mv-name">{{ item.name }}</p>
			<p class="song-name">{{ item.artists[0].name }}</p>
			<div class="button"><i class="el-icon-caret-right"></i></div>
		</el-col>
	</div>
</template>

<script>
	import { recommendedMv } from "@/network/home.js"
	export default {
		name: 'recommendMv',
		data() {
			return {
				mvData: []
			}
		},
		created() {
			recommendedMv().then(res => {
				this.mvData = res.data.result;
			})
		},
		methods: {
			mvClick(id) {
				console.log('aaa')
				this.$router.push({name:'mv',params: {id: id}});
			}
		}
	}
</script>

<style lang="less" scoped>
	.recommend-mv {
		position: relative;
		cursor: pointer;
	}
	.mvCard {
		height: 130px;
		margin: 10px;
		border-radius: 5px;
		overflow: hidden;
	}
	.mvCard img {
		width: 100%;
		height: 100%;
	}
	.play-volume {
		position: absolute;
		right: 25px;
		top: 20px;
		color: var(--white);
		font-size: var(--small-font-size);
	}
	.mv-name, .song-name {
		margin: 10px;
		font-size: var(--small-font-size);
		color: var(--secondary-font-color);
	}
	.mv-name {
		color: var(--main-font-color);
	}
	.button {
		position: absolute;
		left: 105px;
		top: 50px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		font-size: 30px;
		color: var(--blue);
		text-align: center;
		line-height: 50px;
		background-color: var(--blue-hover-bgcolor);
		opacity: 0;
		transition: all .3s;
	}
	.recommend-mv:hover .button {
		opacity: .5;
	}
</style>
