import { request } from "./main.js";

// 获取热搜
export function searchHot() {
	return request({
		url: "/search/hot"
	})
}
// 搜索建议
export function sugges(res) {
	return request({
		url: "/search/suggest",
		params: {
			"keywords": res
		}
	})
}

//搜索内容页面
export function searchContent(res, offset, type) {
	return request({
		url: "/search",
		params: {
			"keywords": res,
			// 页数乘与每页的数量
			"offset": offset * 30,
			"type": type,
			"limit": 30
		}
	})
}