<template>
	<div>
		<div class="audia-player">
			<div class="audia-player-btn">
				<!-- 左边时间区 -->
				<div class="time">
					<div class="singer-img"><img :src="picUrl" v-show="picUrl"></div>
					<div class="singerJj">
						<span class="musicName">
							{{ this.$store.state.musicList[0] && this.$store.state.musicList[this.$store.state.currentPlayMusic].musicName }} - 
							{{ this.$store.state.musicList[0] && this.$store.state.musicList[this.$store.state.currentPlayMusic].name }}
						</span>
						<br/>
						<span class="current-time">{{ currentTime | formatTime }} / {{ totalTime | formatTime }}</span>
					</div>
				</div>
				<div class="btn">
					<div class="leri-play-btn" @click="lastSong"><i class="el-icon-caret-left"></i></div>
					<div class="play-btn" @click="playClick">
						<i :class="isPlayMusic ? 'el-icon-s-promotion' : 'el-icon-caret-right'"></i>
					</div>
					<div class="leri-play-btn" @click="nextSong"><i class="el-icon-caret-right"></i></div>
				</div>
				<!-- 右边按钮区 -->
				<div class="right-btn">
					<audio-right-btn></audio-right-btn>
					<audio-volume @audioVolume="audioVolume"></audio-volume>
				</div>
			</div>
			<audio :src="musicUrl" ref="audio"></audio>
			<!-- 进度条 -->
			<el-slider 
			v-model="musicSpeed" 
			:show-tooltip="false" 
			@change="moveSpeed" 
			@mousedown.native="inMoveSpeed" ></el-slider>
		</div>
	</div>
</template>

<script>
	import { musicUrl, musicIsAvailable, musicDetails } from "@/network/audio.js"
	import { formatTime } from "@/assets/tool.js"
	import AudioVolume from "./AudioVolume.vue"
	import AudioRightBtn from "./AudioRightBtn.vue"
	export default {
		name: 'Audio',
		data() {
			return {
				// 播放进度
				musicSpeed: 0,
				// 当前播放的时长
				currentTime: '',
				// 音乐总时长
				totalTime: '',
				// 定时器
				timer: '',
				// 音乐是否请求成功
				isRequest: false,
				// 是否在播放音乐
				isPlayMusic: false,
				// 音乐url
				musicUrl: '',
				// 音乐背景图片
				picUrl: ''
			}
		},
		components: {
			AudioVolume,
			AudioRightBtn
		},
		computed: {
			isPlay() {
				return this.$store.state.currentPlayMusic;
			}
		},
		watch: {
			isPlay() {
				let musicId = this.$store.state.musicList[this.$store.state.currentPlayMusic].id;
				musicUrl(musicId).then(res => {
					this.musicUrl = res.data.data[0].url;
					setTimeout(() => {
						this.$refs.audio.play();
						this.isPlayMusic = true;
						// 开定时器前把上一个定时器清除
						clearInterval(this.timer);
						this.timer = this.setTime();
					})
				}),
				musicDetails(musicId).then(res => {
					this.picUrl = res.data.songs[0].al.picUrl;
				})
			}
		},
		methods: {
			setTime() {
				return setInterval(() => {
					// 如果播放结束,更改按钮
					if(this.$refs.audio.ended) {
						// 播放结束后判断这是否是最后一首歌
						let lenght = this.$store.state.musicList.length - 1;
						if(this.$store.state.currentPlayMusic == lenght){
							this.$store.commit('changeCurrentPlayMusic', 0);
							this.$refs.audio.play();
						}else{
							this.$store.commit('nextOrLast', true);
						}
						this.musicSpeed = 0;
						return;
					}
					// 获取当前播放进度
					this.currentTime = this.$refs.audio.currentTime;
					this.totalTime = this.$refs.audio.duration;
					// 随时修改进度条
					this.musicSpeed = (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100;
				},500)
			},
			// 开关点击
			playClick() {
				if(this.$store.state.musicList[0]) {
					if(this.$refs.audio.paused) {
						this.$refs.audio.play();
						this.isPlayMusic = true;
						// 开定时器前把上一个定时器清除
						clearInterval(this.timer);
						this.timer = this.setTime();
					}else {
						this.$refs.audio.pause();
						this.isPlayMusic = false;
					}
				}else {
					this.$message('您的播放列表还没有音乐哦~')
				}
			},
			// 拖动或点击进度条事件
			moveSpeed() {
				// 鼠标按下时已经清除了定时器
				this.timer = this.setTime();
				if(this.$refs.audio.paused) {
					this.$refs.audio.play();
					this.isPlayMusic = true;
				}
				this.$refs.audio.currentTime = this.$refs.audio.duration * (this.musicSpeed / 100);
			},
			// 鼠标按下在移动进度条时,清除掉定时器
			inMoveSpeed(event) {
				clearInterval(this.timer);
			},
			// 修改声音大小
			audioVolume(volume) {
				this.$refs.audio.volume = volume;
			},
			// 点击上一首
			lastSong() {
				if(this.$store.state.currentPlayMusic == 0) {
					var a = this.$store.state.musicList.length-1;
					this.$store.commit('changeCurrentPlayMusic', a);
				}else {
					this.$store.commit('nextOrLast', false);
				}
			},
			// 点击下一首
			nextSong() {
				var a = this.$store.state.musicList.length-1;
				if(this.$store.state.currentPlayMusic == a) {
					this.$store.commit('changeCurrentPlayMusic', 0);
				}else {
					this.$store.commit('nextOrLast', true);
				}
			}
		},
		filters: {
			// 格式化时间
			formatTime: function(time) {
				// 使用导入的格式化时间工具
				return formatTime(time);
			}
		}
	}
</script>

<style lang="less" scoped>
	@-webkit-keyframes animal {
	  0%{
	    transform: rotate(0deg);
	    -ms-transform: rotate(0deg);
	    -webkit-transform: rotate(0deg);
	  }
	  100%{
	    transform: rotate(-360deg);
	    -ms-transform: rotate(-360deg);
	    -webkit-transform: rotate(-360deg);
	  }
	}
	.audia-player {
		position: fixed;
		bottom: 0;
		height: 65px;
		width: 100%;
		background-color: var(--white);
		z-index: 100;
	}
	.audia-player-btn {
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
	}
	.time {
		flex: 1;
		user-select: none;
	}
	.time div{
		float: left;
	}
	.singer-img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0 15px;
		overflow: hidden;
		cursor: pointer;
	}
	.singer-img img{
		width: 100%;
		height: 100%;
		-webkit-animation: animal 15s infinite linear ;
		-webkit-transform-origin: center center;
		-ms-transform-origin: center center;
		transform-origin: center center;
	}
	.singerJj {
		margin-top: 6px;
		width: 220px;    
		overflow: hidden;
		text-overflow:ellipsis;
	}
	.musicName {
		font-size: 13px;
		color: var(--routine-font-color);
		white-space: nowrap;
	}
	.current-time {
		font-size: 13px;
		color: var(--routine-font-color);
	}
	.btn {
		flex: 3;
		display: flex;
		align-items:center;
		justify-content:center;
		user-select: none;
	}
	.right-btn {
		flex: 1;
		user-select: none;
	}
	.right-btn div {
		float: left;
	}
	.btn .play-btn{
		display: flex;
		align-items:center;
		justify-content:center;
		width: 48px;
		height: 48px;
		background-color: var(--blue);
		border-radius: 50%;
		transition: all .3s;
		cursor: pointer;
	}
	.btn .play-btn:hover {
		background-color: var(--deep-blue-hover-bgcolor);
	}
	.btn .play-btn > i{
		color: var(--white);
		font-size: 30px;
	}
	.btn .leri-play-btn {
		background-color: var(--hover-bgcolor);
		color: var(--blue);
		height: 40px;
		width: 40px;
		text-align: center;
		border-radius: 50%;
		font-size: 35px;
		margin: 0 15px;
		transition: all .3s;
		cursor: pointer;
	}
	.btn .leri-play-btn:hover {
		background-color: var(--blue-hover-bgcolor);
	}
	.el-slider {
		position: absolute;
		width: 100%;
		left: 0;
		top: -20px;
		height: 0px !important;
	}
	/deep/ .el-slider__runway {
		height: 4px !important;
	}
	/deep/ .el-slider__bar {
		height: 4px !important;
	}
	/deep/ .el-slider__button {
		width: 10px !important;
		height: 10px !important;
	}
</style>
