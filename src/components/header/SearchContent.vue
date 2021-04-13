<template>
		<div class="search-content-card">
			<div v-show="isShow">
				<el-divider content-position="left">热门搜索</el-divider>
				<div class="search-tag">
					<el-tag 
						v-for="(item, index) in hotData" 
						:key="index"
						@click="searchHotClick(item.first)">
						{{ item.first }}
					</el-tag>
				</div>
				<el-divider content-position="left">历史搜索</el-divider>
				<div class="search-tag">
					<el-tag closable>四月是你的谎言</el-tag>
				</div>
			</div>
			<div v-show="!isShow" class="search-result">
				 <el-divider content-position="left"><i class="el-icon-mic"></i>单曲</el-divider>
				 <div class="search-result-single">
					 <div v-if="suggesData['songs']">
						 <p v-for="(item, index) in suggesData['songs']" @click="playMusic(item)">{{ item.name }} - {{ item.artists[0].name }}</p>
					 </div>
					 <p v-else class="tips">未找到单曲</p>
				 </div>
				 <el-divider content-position="left"><i class="el-icon-user"></i>歌手</el-divider>
				 <div class="search-result-single">
					 <div v-if="suggesData['artists']">
					 		<p v-for="(item, index) in suggesData['artists']">{{ item.name }}</p>
					 </div>
					 <p v-else class="tips">未找到歌手</p>
				 </div>
				 <el-divider content-position="left"><i class="el-icon-video-camera"></i>专辑</el-divider>
				 <div class="search-result-single">
					 <div v-if="suggesData['albums']">
							<p v-for="(item, index) in suggesData['albums']">{{ item.name }}</p>
					 </div>
					 <p v-else class="tips">未找到专辑</p>
				 </div>
				 <el-divider content-position="left"><i class="el-icon-tickets"></i>歌单</el-divider>
				 <div class="search-result-single">
					 <div v-if="suggesData['playlists']">
							<p v-for="(item, index) in suggesData['playlists']">{{ item.name }}</p>
					 </div>
					 <p v-else class="tips">未找到歌单</p>
				 </div>
			</div>
		</div>
</template>

<script>
	import { searchHot, sugges } from "@/network/search.js";
	import { musicIsAvailable } from "@/network/audio.js"
	export default {
		name: 'SearchContent',
		data() {
			return {
				// 控制显示搜索还是推荐
				isShow: true,
				// 推荐数据
				hotData: '',
				// 搜索推荐数据
				suggesData: ''
			}
		},
		props: ['searchContent'],
		methods: {
			// 控制显示搜索还是推荐
			isShowSearchContent(boolean) {
				this.isShow = boolean;
			},
			// 把热搜传给父元素
			searchHotClick(content) {
				this.$emit("searchHotClick", content);
				this.$router.push({name:'search',params: {keywords: content}});
			},
			playMusic(item) {
				musicIsAvailable(item.id).then(() => {
					this.$store.commit({
						type: 'addMusicList',
						id: item.id,
						musicName: item.name,
						name: item.artists[0].name
					})
				})
				.catch( err => {
					return this.$message("亲,这首歌暂时没有版权哦~");
				})
			}
		},
		watch: {
			// 实时监听input内容,发出请求
			searchContent : function () {
				// 判断搜索框是否为空
				if(!this.searchContent) return this.suggesData = {};
				sugges(this.searchContent).then(res => {
					this.suggesData = res.data.result;
				})
			}
		},
		created() {
			searchHot().then(res => {
				this.hotData = res.data.result.hots;
			})
		}
	}
</script>

<style>
	.search-content-card {
		position: fixed;
		right: 0;
		height: 100%;
		width: 330px;
		z-index: 90;
		background-color: var(--white);
		border-left: 1px solid var(--three-boder);
		margin-top: 15px;
	}
	.search-tag {
		padding: 10px;
		width: 100%;
	}
	.search-tag > .el-tag {
		margin: 5px;
		cursor: pointer;
	}
	.search-tag > .el-tag:hover {
		background-color: var(--blue-hover-bgcolor);
	}
	.el-divider {
		height: 0.5px !important;
	}
	.el-divider .el-divider__text {
		color: var(--secondary-font-color) !important;
	}
	.search-result i{
		margin-right: 10px;
	}
	.search-result-single {
		font-size: var(--small-font-size);
		color: var(--main-font-color);
		cursor: pointer;
	}
	.search-result-single div > p {
		margin: 0;
		padding: 10px 10px;
		line-height: 25px;
	}
	.search-result-single div > p:hover {
		background-color: var(--hover-bgcolor);
	}
	.tips {
		font-size: var(--small-font-size);
		color: var(--secondary-font-color);
		text-align: center;
	}
</style>
