<template>
	<div class="tabs">
		<span 
			:class="{ active: currentIndex == index }" 
			v-for="(item, index) in data" 
			:key="index"
			@click="tabClick(index)">{{ item }}
		</span>
	</div>
</template>

<script>
	export default {
		name: 'tabs',
		data() {
			return {
				data: ['歌曲', '歌单', 'MV'],
				currentIndex: 0
			}
		},
		methods: {
			tabClick(index) {
				this.currentIndex = index;
				this.$emit('tabClick', index);
			}
		}
	}
</script>

<style lang="less" scoped>
	.tabs {
		padding: 10px 30px;
	}
	.tabs > span {
		padding: 0 12px;
		font-size: var(--second-font-size);
		color: var(--secondary-font-color);
		cursor: pointer;
	}
	.tabs .active {
		color: var(--main-font-color);
	}
</style>
