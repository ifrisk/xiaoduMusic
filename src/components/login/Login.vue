<template>
	<el-dialog
		title="登录"
		:visible.sync="dialogVisible"
		width="30%"
		:before-close="handleClose">
		<div class="rq-login">
			<p class="rq-login-p1">扫码登陆</p>
			<div class="rq-img">
				<div v-show="isRefresh"><span class="el-icon-refresh-right" @click="rqRefresh"></span></div>
				<img :src="rqBase64">
			</div>
			<p class="rq-login-p3" @click="passwordLogon">使用手机登录>>></p>
		</div>
	</el-dialog>
</template>

<script>
	import { rqCodeLogin, rqGenerate, qrLoop, refreshLogin, userInformations } from "@/network/login.js"
	export default {
		name: 'Logon',
		data() {
			return {
				// 用于获取二维码的key
				unikey: '',
				// 是否关闭窗口
				dialogVisible: false,
				// 是否显示刷新
				isRefresh: false,
				// 二维码base64
				rqBase64: '',
				// 获取二维码函数
				rqFun: {},
				// 轮询二维码接口状态
				qrLoop: {},
				// 刷新用户状态函数
				refreshLogins: {},
				// 用户信息
				userInformation: ''
			}
		},
		created() {
			// 刷新登录状态和获取用户信息函数
			this.refreshLogins = function() {
				refreshLogin().then(res => {
					return userInformations(new Date().getTime())
				}).then(res => {
					// 获取用户信息
					// console.log(res.data)
					this.userInformation = res.data;
					// 发送给父组件
					this.$emit("userInfos", this.userInformation);
				})
			}
			this.refreshLogins();
			// 创建可复用函数
			this.rqFun = function() {
				rqCodeLogin(new Date().getTime()).then(res => {
					this.unikey = res.data.data.unikey;
					return res.data.data.unikey;
				}).then(res => {
					return rqGenerate(res, new Date().getTime());
				}).then(res => {
					this.rqBase64 = res.data.data.qrimg;
					console.log(this.rqBase64)
				})
			}
		},
		methods: {
			// 父组件点击打开窗口
			loginClick() {
				this.rqFun();
				// 开启接口轮询
				this.qrLoop = setInterval(() => {
					qrLoop(this.unikey, new Date().getTime()).then(res => {
						console.log(res.data)
						if( res.data.code == 803) {
							this.$message({
								message: '登陆成功',
								type: 'success'
							});
							// 刷新登录状态和获取用户信息
							this.refreshLogins();
							// 关闭窗口
							this.dialogVisible = false;
							// 清除轮询
							clearInterval(this.qrLoop);
						}else if(res.data.code == 802) {
							this.$message({
								message: '请在手机上确认登陆',
								type: 'warning'
							});
						}else if(res.data.code == 800) {
							// 显示刷新按钮
							this.isRefresh = true;
						}
					})
				},3000);
				// 打开窗口
				this.dialogVisible = true;
			},
			// 关闭窗口
			handleClose() {
				this.dialogVisible = false;
				// 清除轮询
				clearInterval(this.qrLoop);
			},
			// 刷新二维码
			rqRefresh() {
				this.rqFun();
				this.isRefresh = false;
			},
			passwordLogon() {
				this.$message("暂未开发哦~");
			}
		}
	}
</script>

<style lang="less" scoped>
	.rq-login {
		width: 100%;
		height: 100%;
		text-align:center;
	}
	.rq-login-p1 {
		font-size: var(--big-font-size);
		color: var(--black);
		margin: 0;
	}
	.rq-login-p2 {
		font-size: 12px;
		color: var(--black);
		cursor: pointer;
	}
	.rq-login-p2:hover {
		color: var(--blue);
	}
	.rq-login-p3 {
		cursor: pointer;
	}
	.rq-login-p3:hover {
		color: var(--blue);
	}
	.rq-img {
		position: relative;
		width: 200px;
		height: 200px;
		margin: 30px auto;
	}
	.rq-img > div {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.5);
		font-size: 25px;
		color: #ffffff;
	}
	.rq-img > div span {
		margin-top: 85px;
		cursor: pointer;
	}
	.rq-img > div span:hover {
		color: var(--blue);
	}
</style>

