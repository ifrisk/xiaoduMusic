<template>
	<div>
		<el-input
			class="search-input"
			placeholder="搜索"
			prefix-icon="el-icon-search"
			@focus="isShowSearch"
			v-model.trim="inputContent"
			size="small"
			@input="isShowSearchContent"
			@keyup.native.enter="searchContent">
	  </el-input>
	  <search-content 
		  v-show="isShow"
		  ref="SearchContent"
		  @searchHotClick="searchHotClick"
		  :searchContent="inputContent">
		</search-content>
		<div class="mb" v-show="isShow" @click="isShowSearch"></div>
	</div>
</template>

<script> 
	import SearchContent from "./SearchContent.vue";
	export default {
		name: 'Search',
		data() {
			return {
				// 搜索框内容
				inputContent: '',
				// 是否显示搜索推荐框
				isShow: false,
			}
		},
		components: {
			SearchContent
		},
		methods: {
			isShowSearch(event) {
				if(event.type == "focus") return this.isShow = true;
				this.isShow = false;
			},
			// 是否显示查找内容页面
			isShowSearchContent() {
				if(this.inputContent) return this.$refs.SearchContent.isShowSearchContent(false);
				this.$refs.SearchContent.isShowSearchContent(true);
			},
			// 点击热搜获取搜索内容
			searchHotClick(content) {
				this.inputContent = content;
			},
			// 按下回车搜索内容
			searchContent() {
				if(!this.inputContent) return this.$message("请输入要搜索的名字~")
				this.$router.push({name:'search',params: {keywords: this.inputContent}});
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-input {
		z-index: 90;
	}
	.mb {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 80;
	}
</style>
