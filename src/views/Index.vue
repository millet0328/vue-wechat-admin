<template>
	<el-container class="container">
		<el-header>
			<HeaderBar></HeaderBar>
		</el-header>
		<el-container>
			<el-aside width="201px">
				<LeftMenu></LeftMenu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import HeaderBar from '@/components/HeaderBar.vue';
	import LeftMenu from '@/components/LeftMenu.vue';
	export default {
		components: {
			HeaderBar,
			LeftMenu
		}
	}
</script>
<style lang="scss">
	.container {
		width: 100%;
		min-height: 100vh;
		background-color: #545C64;
		color: white;

		.el-header {
			line-height: 60px;
		}

		.el-main {
			background-color: white;
			color: #333;
		}

	}
</style>
