<template>
	<div class="nav-bar">
		<div class="left">
			<img class="logo am-margin-right-sm" src="../assets/img/common/logo.png">
			<i @click="collapseHandle" class="el-icon-s-fold"></i>
		</div>
		<el-menu mode="horizontal" router :default-active="activeIndex" background-color="#31404e" text-color="#fff"
		 active-text-color="#ffd04b">
			<el-submenu index="1">
				<template slot="title">
					<el-avatar :src="avatar" :size="30"></el-avatar>
					<span class="username am-margin-left-sm">{{username}}</span>
				</template>
				<el-menu-item>消息</el-menu-item>
				<el-menu-item index="/user/info">设置</el-menu-item>
				<el-menu-item>退出</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				activeIndex: '1',
			}
		},
		created() {
			this.getUserInfo();
		},
		computed: {
			...mapGetters('User', ['username', 'avatar'])
		},
		methods: {
			collapseHandle() {
				this.$store.commit("Menu/ToggleMenu");
			},
			getUserInfo() {
				this.$store
					.dispatch("User/LoadInfo", { id: sessionStorage.id })
			}
		}
	}
</script>

<style lang="less">
	.nav-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			align-items: center;

			.logo {
				height: 50px;
			}
		}

	}
</style>
