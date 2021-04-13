<template>
	<div class="latest-music wrap clearfix">
		<div v-for="(item, index) in musicData" :key="index" @click="playMusic(item)">
			<div class="latest-music-list">
				<div class="latest-music-list-1">
					{{ index+1 }}
				</div>
				<div class="latest-music-list-2">
					<img :src="item.picUrl" alt="">
				</div>
				<div class="latest-music-list-3">
					<p>{{ item.name }}</p>
					<p>{{ item.song.artists[0].name }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { latestMusic } from "@/network/home.js"
	export default {
		name: 'latestMusic',
		data() {
			return {
				musicData: []
			}
		},
		created() {
			latestMusic().then(res => {
				this.musicData = res.data.result;
			})
		},
		methods: {
			// 播放音乐
			playMusic(item) {
				this.$store.commit({
					type: 'addMusicList',
					id: item.id,
					musicName: item.name,
					name: item.song.artists[0].name
				})
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.latest-music {
		
	}
	.latest-music-list {
		width: 50%;
		height: 95px;
		float: left;
		cursor: pointer;
		transition: all .2s;
	}
	.latest-music-list:hover {
		background-color: var(--hover-bgcolor);
	}
	.latest-music-list > div {
		float: left;
	}
	.latest-music-list-1 {
		line-height: 90px;
		width: 30px;
		text-align: center;
		font-size: var(--font-size);
		color: var(--routine-font-color);
	}
	.latest-music-list-2 {
		height: 75px;
		width: 75px;
		margin-top: 10px;
		margin-right: 20px;
	}
	.latest-music-list-2 img {
		width: 100%;
		height: 100%;
	}
	.latest-music-list-3 {
		line-height: 20px;
	}
	.latest-music-list-3 p:first-child {
		color: var(--main-font-color);
	}
	.latest-music-list-3 p {
		max-width: 400px;
		overflow: hidden;
		white-space:nowrap;
		text-overflow: ellipsis;
		font-size: var(--font-size);
		color: var(--routine-font-color);
	}
</style>
