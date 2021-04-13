<template>
	<div>
		<i class="volume-icon" 
		:class="isSilent ? 'el-icon-turn-off-microphone' : 'el-icon-microphone'"
		@click="isSilents"></i>
		<span class="box" id="box-lj" ref="boxLj" >
				<i class="hd" ref="hd" @mousedown="hdOnmouse" :style="{ left: left }"></i>
				<i class="hdt" ref="hdt" :style="{ width: width }"></i>
				<!-- <p class="text">0</p> -->
		</span>
	</div>
</template>

<script>
	export default {
		name: 'AudioVolume',
		data() {
			return {
				// 圆按钮的left
				left: '50%',
				// 进度条的宽度
				width: '50%',
				// 音量
				volume: '',
				// 是否静音
				isSilent: false
			}
		},
		methods: {
			// 监听圆点按下
			hdOnmouse(event) {
				var boxWidth = this.$refs.boxLj.offsetWidth;
				var hdWidth = this.$refs.hd.offsetWidth;
				var leftval = event.clientX - this.$refs.hd.offsetLeft;
				var that = this;
				// 监听鼠标移动
				document.onmousemove = function(event) {
					// 修改圆点和进度条位置
					that.left = event.clientX - leftval + 'px';
					that.width = event.clientX - leftval + 'px';
					// 算音量的大小, 四舍五入后再除以10
					that.volume = Math.round(((event.clientX - leftval) / boxWidth) * 10) / 10;
					var far = parseInt(that.left);
					// 判断是否越界
					if(far < 0) {
						that.left = 0 + 'px';
						that.width = 0;
						that.volume = 0;
					};
					if(far > boxWidth - hdWidth){
						that.left = boxWidth - hdWidth +'px';
						that.width = boxWidth +'px';
						that.volume = 1;
					}
					// 把音量传给父组件
					that.$emit("audioVolume", that.volume);
				}
				document.onmouseup = function() {
					// 清除监听鼠标移动
					document.onmousemove = null;	
				}
			},
			// 是否静音
			isSilents() {
				this.isSilent = !this.isSilent;
				if(this.isSilent){
					this.volume = 0;
					this.left = 0;
					this.width = 0;
					this.$emit("audioVolume", this.volume);
				}else {
					this.volume = 0.5;
					this.left = "50%";
					this.width = "50%";
					this.$emit("audioVolume", this.volume);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.box, .box .hd, .box .hdt{
		display: inline-block;
		*display: inline;
		zoom:1;
	}
	.box {
		cursor: pointer;
		width: 180px;
		height: 3px;
		background-color: var(--three-boder);
		position: relative;
		vertical-align: middle;
	}
	.box .hd {
		width: 15px;
		height: 15px;
		background-color: var(--blue);
		border-radius: 50%;
		position: absolute;
		left: 0;
		top: -6px;
		cursor: pointer;
		margin: 0;
	}
	.box .hdt {
		position: absolute;
		top: 0;
		left: 0;
		height: 3px;
		width: 0;
		background-color: var(--blue);
		margin: 0;
	}
	.volume-icon {
		font-size: 25px;
		color: var(--routine-font-color);
		margin-right: 10px;
		vertical-align:middle;
		cursor: pointer;
	}
</style>
