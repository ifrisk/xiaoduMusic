<template>
	<div>
		<el-container class="main-container">
		  <el-header>
				<div class="main-search">
					<search class="main-search-ch"></search>
				</div>
			</el-header>
		  <el-container>
		    <el-aside width="260px">
					<asides class="asides"></asides>
				</el-aside>
		    <el-main>
					<router-view></router-view>
				</el-main>
		  </el-container>
		</el-container>
		<audios></audios>
	</div>
</template>

<script>
	import Asides from "../asides/Asides.vue"
	import Search from "../header/Search.vue"
	import Audios from "../audio/Audio.vue"
	export default {
	  name: 'Mains',
	  components: {
	    Asides,
			Search,
			Audios
	  }
	}
</script>

<style lang='less' scoped>
	.main-container{
		height: 100vh;
	}
	.el-header {
		background: var(--sub-color);
		padding: 0;
		box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.1);
		position: sticky;
		top: 0;
		left: 0;
		z-index: 100;
	}
	  
	.el-aside {
		background: var(--main-color);
	}
	.el-main {
		padding: 0;
		margin-bottom: 60px;
		height: 83vh;
		overflow: auto;
	}
	.main-search{
		margin-right: 50px;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
</style>
