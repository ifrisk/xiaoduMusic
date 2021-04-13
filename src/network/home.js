import { request } from './main.js';

// 获取banner
export function homeBanner(){
	return request({
		url: "/banner",
	})
}

// 获取推荐歌单
export function recommendedSongList() {
	return request({
		url: "/personalized",
		params: {
			"limit": 10
		}
	})
}

// 最新音乐
export function latestMusic() {
	return request({
		url: "/personalized/newsong"
	})
}

// 推荐MV
export function recommendedMv() {
	return request({
		url: "/personalized/mv"
	})
}