import { request } from './main.js';

// 二维码key生成接口
export	function rqCodeLogin(time) {
	return request({
		url: "/login/qr/key",
		"time": time
	})
}
// 二维码生成接口
export	function rqGenerate(unikey, time) {
	return request({
		url: "/login/qr/create",
		params: {
			"key": unikey,
			"qrimg": "qrimg",
			"time": time
		}
	})
}
// 二维码检测扫码状态接口
export	function qrLoop(unikey, time) {
	return request({
		url: "/login/qr/check",
		params: {
			"key": unikey,
			"time": time
		}
	})
}
// 刷新登录
export	function refreshLogin() {
	return request({
		url: "/login/refresh"
	})
}
// 获取用户信息
export	function userInformations(time) {
	return request({
		url: "/user/account",
		params: {
			"time": time
		}
	})
}
// 退出
export	function loginOut() {
	return request({
		url: "/logout",
	})
}