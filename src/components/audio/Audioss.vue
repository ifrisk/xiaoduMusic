<template>
	<div>
		<div class="audia-player">
			<div class="audia-player-btn">
				<!-- 左边时间区 -->
				<div class="time">
					<span class="current-time">{{ currentTime | formatTime }}</span>
					/
					<span class="total-time">{{ totalTime | formatTime }}</span>
				</div>
				<div class="btn" @click="playAudio">
					<div class="play-btn"><i :class="this.$store.state.isPlay ? 'el-icon-sort' : 'el-icon-caret-right'"></i></div>
				</div>
				<!-- 右边按钮区 -->
				<div class="right-btn">
					<audio-volume @audioVolume="audioVolume"></audio-volume>
				</div>
			</div>
			<audio src="https://mp32.9ku.com/upload/128/2019/11/08/998378.mp3" ref="audio"></audio>
			<!-- 进度条 -->
			<div class="total-progress" 
				@click="modifySpeed" 
				ref="totalProgress">
				<div class="current-progress" :style="{ width: ratio*100 + '%' }">
					<div class="current-progress-btn" ref="Circular"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { formatTime } from "@/assets/tool.js"
	
	import AudioVolume from "./AudioVolume.vue"
	export default {
		name: 'Audio',
		data() {
			return {
				// 进度条宽度
				totalWidth: '',
				// 总进度条的x坐标
				titalX: '',
				// 鼠标的x坐标
				mouseX: '',
				// 进度条位置
				ratio: '',
				// 计时器,用于随时更改进度
				timer: '',
				// 音频总时长
				totalTime: '',
				// 音频已播放时长
				currentTime: '',
			}
		},
		components: {
			AudioVolume
		},
		// 获取state的isPlay的值,用于watch实时监听
		computed: {
			isPlay() {
				return this.$store.state.isPlay;
			}
		},
		methods: {
			// 计算进度条
			getRatio(event) {
				this.totalWidth = this.$refs.totalProgress.offsetWidth;
				this.totalX = this.$refs.totalProgress.offsetLeft;
				this.mouseX = event.offsetX;
				this.ratio = (this.mouseX - this.totalX) / this.totalWidth;
			},
			
			// 计数器
			setTime() {
				return setInterval(() => {
					if(this.$refs.audio.ended) return  this.$store.commit("changePlay", false);
					this.currentTime = this.$refs.audio.currentTime;
					this.totalTime = this.$refs.audio.duration;
					this.ratio = this.$refs.audio.currentTime / this.$refs.audio.duration;
				})
			},
			// 点击播放按钮
			playAudio() {
				if(this.$refs.audio.paused){
					this.$refs.audio.play();
					this.$store.commit("changePlay", true);
				}else {
					this.$refs.audio.pause();
					this.$store.commit("changePlay", false);
				}
				this.timer = this.setTime();
			},
			// 点击修改进度条
			modifySpeed(event) {
				this.getRatio(event);
				if(this.$refs.audio.paused){
					this.$refs.audio.play();
					this.$store.commit("changePlay", true);
				}
				this.$refs.audio.currentTime = this.$refs.audio.duration * this.ratio;
				this.timer = this.setTime();
			},
			// 修改声音大小
			audioVolume(volume) {
				this.$refs.audio.volume = volume;
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
	.audia-player {
		position: fixed;
		bottom: 0;
		height: 60px;
		width: 100%;
		background-color: var(--white);
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
	.btn .play-btn{
		display: flex;
		align-items:center;
		justify-content:center;
		width: 48px;
		height: 48px;
		background-color: var(--blue);
		border-radius: 50%;
		cursor: pointer;
	}
	.btn .play-btn > i{
		color: var(--white);
		font-size: 30px;
	}
	.total-progress {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 3px;
		background-color: var(--three-boder);
		cursor: pointer;
	}
	.current-progress {
		position: absolute;
		left: 0;
		top: 0;
		width: 0;
		height: 3px;
		background-color: var(--blue);
	}
	.current-progress-btn {
		position: absolute;
		right: -8px;
		top: -5px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background-color: var(--blue);
		cursor: pointer;
		display: none;
	}
	.total-progress:hover .current-progress-btn {
		display: block;
	}
</style>
