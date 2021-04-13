<template>
  <div id="app">
    <mains></mains>
  </div>
</template>

<script>
	import Mains from "@/components/main/Mains.vue"
	export default {
		name: 'app',
		components: {
			Mains
		}
	}
</script>

<style lang='less' scoped>
	@import url("assets/css/global.css");
</style>
