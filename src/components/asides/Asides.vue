<template>
	<div>
		<el-col :span="24">
			<el-menu
				background-color="var(--main-color)"
				text-color="var(--main-font-color)"
				active-text-color="var(--blue)"
				default-active="/home"
				router
				>
				<el-menu-item class="login-button" @click="clickLogin" v-if="!isLogin">
					<i class="el-icon-user-solid"></i>
					<span slot="title">未登录</span>
				</el-menu-item>
				<el-menu-item class="login-button" v-else @click="loginOut">
					<el-avatar  :size="40" :src="userInfo.profile.avatarUrl"></el-avatar>
					{{ userInfo.profile.nickname }}
				</el-menu-item>
				<el-menu-item index="/home">
					<i class="el-icon-reading"></i>
					<span slot="title">发现音乐</span>
				</el-menu-item>
				<el-menu-item index="/recommend">
					<i class="el-icon-document"></i>
					<span slot="title">推荐歌单</span>
				</el-menu-item>
				<el-menu-item index="/newest">
					<i class="el-icon-news"></i>
					<span slot="title">最新音乐</span>
				</el-menu-item>
				<el-menu-item index="newmv">
					<i class="el-icon-video-camera"></i>
					<span slot="title">最新MV</span>
				</el-menu-item>
			</el-menu>
		</el-col>
		<login ref="login" @userInfos="userInfos"></login>
	</div>
</template>

<script>
	import Login from "@/components/login/Login.vue";
	import { loginOut } from "@/network/login.js"
	export default {
		name: 'Asides',
		data() {
			return {
				isLogin: false,
				userInfo: ''
			}
		},
		components: {
			Login
		},
		methods: {
			clickLogin() {
				this.$refs.login.loginClick();
			},
			// 获取用户信息
			userInfos(info) {
				if(!info.account) return;
				this.userInfo = info;
				this.isLogin = true;
				console.log(this.userInfo)
			},
			loginOut() {
				loginOut().then(res => {
					this.$message("已经退出登陆了哦");
					this.isLogin = false;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-col {
		background-color: var(--main-color);
	}
	.el-menu {
		border: none;
	}
	.el-menu-item:focus, .el-menu-item:hover {
	    background-color: #E2E2E2 !important;
	}
	.el-menu-item i{
		color: var(--mian-font-color);
	}
	.login-button i{
		font-size: 25px;
		margin-right: 20px;
	}
</style>
