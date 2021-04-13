<template>
	<div class="searchContent" v-loading="isLoading" id="backTop">
		<div class="search-header">
			搜索<span>{{ this.$route.params.keywords }}</span>找到{{ searchCount }}个结果
		</div>
		<!-- 选择栏 -->
		<tabs @tabClick="tabClick"></tabs>
		<el-divider></el-divider>
		<!-- 音乐列表 -->
		<el-table
			:data="searchData"
			stripe
			style="width: 100%"
			class="tables"
			v-show="tabIndex == 0"
			@row-click="musicPlay">
			<el-table-column type="index" width="50" class="tableIndex"></el-table-column>
			<el-table-column prop="name" label="音乐标题"></el-table-column>
			<el-table-column prop="artists[0].name" label="歌手" width="300"></el-table-column>
			<el-table-column prop="album.name" label="专辑" width="300"></el-table-column>
			<el-table-column prop="mark" label="时长" width="100">
				<template slot-scope="scope">
					<div>
						{{ scope.row.duration | formatTime }}
					</div>
				</template>
			</el-table-column>
		</el-table>
		<!-- 歌单 -->
		<el-row v-show="tabIndex == 1" class="song-sheet">
			<el-col :span="4" v-for="(item, index) in songSheetData" :key="index">
				<el-card :body-style="{ padding: '0px'}" shadow="never">
					<img :src="item.coverImgUrl" class="card-imges">
					<span class="play-volume">{{ item.playCount }}</span>
					<div class="button song-sheet-button"><i class="el-icon-caret-right"></i></div>
					<div>
						<span>{{ item.name }}</span>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- mv -->
		<el-row v-show="tabIndex == 2" class="song-mv">
			<el-col :span="4" v-for="(item, index) in mvData" :key="index">
				<el-card :body-style="{ padding: '0px'}" shadow="never">
					<img :src="item.cover" class="card-imges">
					<span class="play-volume">{{ item.playCount }}</span>
					<div class="button mv-button"><i class="el-icon-caret-right"></i></div>
					<div>
						<span>{{ item.name }}</span>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 分页 -->
		<el-pagination
		  background
		  layout="prev, pager, next"
		  :total="searchCount"
			:page-size="pageSize"
			@current-change="turnPage"
			:current-page="currentPage"
			@prev-click="prevClick"
			@next-click="nextClick">
		</el-pagination>
	</div>
</template>

<script>
	import { formatTime } from "@/assets/tool.js"
	import { searchContent } from "@/network/search.js";
	import { musicIsAvailable } from "@/network/audio.js"
	import Tabs from "./tabs.vue";
	export default {
		name: 'search',
		data() {
			return {
				// 当前tab的索引
				tabIndex: 0,
				// 音乐总条数
				searchCount: 0,
				isLoading: true,
				// 每页显示的数目
				pageSize: 30,
				// 当前第几页
				currentPage: 1,
				// 搜索类型
				searchType: [
					{ type: 1, page: 0 },
					{ type: 1000 ,page: 0 },
					{ type: 1004, page: 0 }
				],
				// 获取的音乐数据
				searchData: [],
				// 获取的歌单乐数据
				songSheetData: [],
				//	获取mv数据
				mvData: [],
				// 存放获取数据的函数
				searchFun: ''
			}
		},
		components: {
			Tabs
		},
		watch: {
			$route: function() {
				this.isLoading = true;
				// 获取数据
				this.searchFun();
			}
		},
		created() {
			// 获取数据可复用函数
			this.searchFun = function() {
				// 开启loading
				this.isLoading = true;
				var data = this.searchType[this.tabIndex];
				// 获取数据
				searchContent(this.$route.params.keywords, data.page, data.type).then(res => {
					// 判断是什么数据并赋值数据
					if(res.data.result.songs) {
						this.searchCount = res.data.result.songCount;
						this.searchData = res.data.result.songs;
					}else if(res.data.result.playlists) {
						this.searchCount = res.data.result.playlistCount;
						this.songSheetData = res.data.result.playlists;
					}else if(res.data.result.mvs){
						this.searchCount = res.data.result.mvCount;
						this.mvData = res.data.result.mvs;
					}
					this.isLoading = false;
				})
			},
			this.searchFun();
		},
		filters: {
			formatTime(val) {
				return formatTime(val / 1000);
			}
		},
		methods: {
			// 导航条点击
			tabClick(index) {
				this.tabIndex = index;
				this.currentPage = this.searchType[this.tabIndex].page + 1;
				this.searchFun();
			},
			// 点击数字修改页数
			turnPage(val) {
				this.searchType[this.tabIndex].page = val - 1;
				this.searchFun();
				// 返回顶部需要跨组件来修改,因为导航条是另一个组件产生的,意外发现可以这么获取组件外的方法
				document.getElementsByClassName("el-main")[0].scrollTop = 0;
			},
			// 点击上一页修改页数
			prevClick() {
				this.searchType[this.tabIndex].page -= 1;
			},
			// 点击下一页修改页数
			nextClick() {
				this.searchType[this.tabIndex].page += 1;
			},
			// 点击音乐
			musicPlay(row) {
				// 判断音乐是否可用,是否有版权,404进入catch就是没版权
				musicIsAvailable(row.id).then(res => {		
					this.$store.commit({
						type: 'addMusicList',
						id: row.id,
						musicName: row.name,
						name: row.artists[0].name
					})
				})
				.catch( err => {
					return this.$message("亲,这首歌暂时没有版权哦~");
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.searchContent {
		height: 83vh;
	}
	.search-header {
		font-size: var(--font-size);
		color: var(--secondary-font-color);
		padding: 25px;
	}
	.search-header > span {
		font-size: var(--big-font-size);
		color: var(--main-font-color);
		padding: 10px;
	}
	.el-table {
		font-size: var(--font-size);
		cursor: pointer;
	}
	/deep/ .el-table__row  td:nth-child(1)  {
		text-align: center;
		color: var(--secondary-font-color);
	}
	.el-pagination {
		padding: 40px 0;
		text-align: center;
	}
	.song-sheet .card-imges {
		width: 100%;
		height: 100%;
	}
	.song-sheet .el-card {
		position: relative;
		width: 180px;
		height: 260px;
		overflow: hidden;
		border: none;
		cursor: pointer;
	}
	.song-sheet {
		overflow: auto;
		width: 93%;
		margin: 0 auto;
	}
	.song-mv {
		overflow: auto;
		width: 93%;
		margin: 0 auto;
	}
	.song-mv .el-card{
		position: relative;
		width: 180px;
		height: 200px;
		overflow: hidden;
		border: none;
		cursor: pointer;
	}
	.song-mv .card-imges {
		width: 100%;
		height: 100%;
		
	}
	.play-volume {
		position: absolute;
		right: 8px;
		top: 5px;
		color: var(--white);
		font-size: var(--small-font-size);
	}
	.song-sheet-button {
		position: absolute;
		top: 65px;
		left: 65px;
	}
	.song-sheet .el-card:hover .button{
		opacity: .8;
	}
	.song-mv .mv-button {
		position: absolute;
		top: 25px;
		left: 65px;
	}
	.song-mv .el-card:hover .button{
		opacity: .8;
	}
	.button {
		width: 50px;
		height: 50px;
		background-color: var(--blue-hover-bgcolor);
		border-radius: 50%;
		text-align: center;
		font-size: 30px;
		line-height: 50px;
		color: var(--blue);
		opacity: 0;
		transition: all .3s;
	}
</style>
