import { request } from './main.js';

// 获取音乐url
export function musicUrl(id){
	return request({
		url: "/song/url",
		params: {
			"id": id,
			"withCredentials": true
		}
	})
}
// 查看音乐是否可用
export function musicIsAvailable(id) {
	return request({
		url: "/check/music",
		params: {
			"id": id
		}
	})
}
// 获取歌曲详情
export function musicDetails(ids) {
	return request({
		url: "/song/detail",
		params: {
			"ids": ids
		}
	})
}