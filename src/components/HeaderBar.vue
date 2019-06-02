<template>
	<div class="clearfix">
		<img src="../assets/img/common/logo.png" class="am-text-middle" height="40" />
		<i @click="collapseHandle" class="el-icon-menu am-text-middle am-margin-left-xl"></i>
		<div class="pull-right">
			<el-dropdown class="white" trigger="click">
				<span class="am-text-middle am-margin-right-sm">
					{{nickname}}
				</span>
				<img class="am-text-middle" width="20" :src="avatar" />
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>消息</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {

			}
		},
		created() {
			this.getUserInfo();
		},
		computed: {
			...mapGetters('User', ['nickname', 'avatar'])
		},
		methods: {
			collapseHandle() {
				this.$store.commit("Menu/toggleMenu");
			},
			getUserInfo() {
				this.$store
					.dispatch("User/GetUserInfo", { uid: sessionStorage.uid })
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.el-dropdown {
		color: white;
	}
</style>
