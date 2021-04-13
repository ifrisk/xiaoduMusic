<template>
	<div>
		<el-tooltip effect="dark" content="播放列表" placement="top">
			<i class="el-icon-tickets play-list" @click="showList"></i>
		</el-tooltip>
		<div class="play-list-content" :class="{ show: isShow }">
			<p class="title">播放列表</p>
			<p class="title-tow">总共 {{ this.$store.state.musicList.length }} 首</p>
			<el-divider></el-divider>
			<div class="content titles">
					<span>音乐标题</span>
					<span>歌手</span>
					<span>专辑</span>
			</div>
			<div 
				class="content" 
				v-for="(item, index) in musicList" 
				:key="index"
				@click="listContentClick(index)"
				:class="[item.id == $store.state.musicList[$store.state.currentPlayMusic].id ? 'active': '']"><!-- 判断当前播放的歌的id和这个id是否相同 -->
					<span>{{ item.name }}</span>
					<span>{{ item.ar[0].name }}</span>
					<span><img :src="item.al.picUrl"></span>
			</div>
		</div>
		<div class="mb" v-show="isShow" @click="closeList"></div>
	</div>
</template>

<script>
	import { musicDetails } from "@/network/audio.js"
	export default {
		name: 'AudioRightBtn',
		data() {
			return {
				isShow: false,
				// 发起请求函数
				obtainListFun: {},
				// 获取到的音乐信息
				musicList: []		
			}
		},
		computed: {
			isPlay() {
				return this.$store.state.musicList;
			}
		},
		watch: {
			isPlay() {
				// 音乐列表有变化就进行更新
				this.obtainListFun();
			}
		},
		created() {
			// 可复用函数
			this.obtainListFun = function() {
				let str = '';
				// 获取音乐列表音乐id的详细信息
				let  list = this.$store.state.musicList;
				for(let i = 0; i < list.length; i++) {
					str += list[i].id + ",";
				}
				// 去除最后一个逗号
				if (str.length > 0) {
					str = str.substr(0, str.length - 1);
				}
				// 发起请求
				musicDetails(str).then( res => {
					this.musicList = res.data.songs;
				})
			}
			// 获取id详细信息
			this.obtainListFun();
		},
		methods: {
			showList() {
				this.isShow = true;
			},
			closeList() {
				this.isShow = false;
			},
			// 点击列表内容音乐开始播放
			listContentClick(index) {
				this.$store.commit('changeCurrentPlayMusic', index);
			},
			aaa(item) {
				console.log(item)
			}
		}
	}
</script>

<style lang="less" scoped>
	.play-list {
		font-size: 25px;
		color: var(--routine-font-color);
		margin-right: 20px;
		cursor: pointer;
	}
	.play-list-content {
		z-index: 9999;
		width: 420px;
		height: 100vh;
		position: fixed;
		right: -420px;
		top: 0;
		background-color: white;
		padding: 10px 0px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		transition: all .3s;
		box-sizing: border-box;
		overflow: auto;
	}
	.play-list-content .title {
		text-align: center;
	}
	.play-list-content .title-tow {
		color: var(--routine-font-color);
		padding: 0 20px;
	}
	.show {
		right: 0;;
	}
	.mb {
		z-index: 100;
		width: 100%;
		height: 100%;
		position: fixed;
		right: 0;
		top: 0;
	}
	.content {
		display: flex;
		padding: 0 20px;
		font-size: var(--font-size);
		color: var(--main-font-color);
		text-align: center;
	}
	.titles {
		color: var(--secondary-font-color);
	}
	.content:hover {
		background-color: var(--hover-bgcolor);
	}
	.content span {
		flex: 1;
		height: 45px;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.content span img{
		height: 80%;
		border-radius: 5px;		
	}
	.active {
		color: var(--blue);
		line-height: 45px;
	}
</style>
