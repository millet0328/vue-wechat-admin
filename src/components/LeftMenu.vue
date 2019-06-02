<template>
	<el-menu :collapse="isCollapse" :default-openeds="['1']" background-color="#545c64" router text-color="#fff"
	 active-text-color="#ffd04b">
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-s-goods"></i>
				<span slot="title">商品管理</span>
			</template>
			<el-menu-item index="/goods/category">商品分类</el-menu-item>
			<el-menu-item index="/goods/release">发布商品</el-menu-item>
			<el-menu-item index="/goods/list">商品列表</el-menu-item>
		</el-submenu>
		<el-submenu v-if="role==1 || role==2" index="2">
			<template slot="title">
				<i class="el-icon-user-solid"></i>
				<span slot="title">用户管理</span>
			</template>
			<el-menu-item index="/user/list">用户列表</el-menu-item>
			<el-menu-item v-if="role==1">用户角色</el-menu-item>
			<el-menu-item v-if="role==1">角色权限</el-menu-item>
		</el-submenu>
		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-s-order"></i>
				<span slot="title">订单管理</span>
			</template>
			<el-menu-item index="/order/list">订单列表</el-menu-item>
		</el-submenu>
		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-s-tools"></i>
				<span slot="title">账户设置</span>
			</template>
			<el-menu-item index="/user/info">账户信息</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
	import { mapState, mapGetters } from 'vuex';
	export default {
		computed: {
			...mapState({
				isCollapse: state => state.Menu.isCollapse,
			}),
			...mapGetters({
				role: 'User/role',
			})
		}

	}
</script>

<style>
</style>
