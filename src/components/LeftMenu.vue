<template>
	<el-menu :collapse="isCollapse" :default-openeds="['0']" background-color="#334e66" router text-color="#fff"
	 active-text-color="#ffd04b">
		<el-submenu v-for="(item,index) in tree" :key="item.id" :index="index.toString()">
			<template slot="title">
				<i :class="`el-icon-${item.icon}`"></i>
				<span slot="title">{{item.name}}</span>
			</template>
			<el-menu-item v-for="element in item.children" :key="element.id" :index="element.path">
				<i :class="`el-icon-${element.icon}`"></i>
				<span slot="title">{{element.name}}</span>
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';

	export default {
		computed: {
			...mapState('Menu', ['isCollapse', 'tree']),
			...mapGetters('User', ['role'])
		},
		created() {
			this.loadMenuTree();
		},
		methods: {
			loadMenuTree() {
				this.$store.dispatch("Menu/LoadTree", { id: sessionStorage.role });
			}
		}
	}
</script>

<style scoped="scoped">
	.el-menu {
		border-right: 0;
	}
</style>
