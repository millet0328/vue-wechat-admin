<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>账户信息</span>
			</div>
			<el-form :model="form" label-position="left" label-width="100px">
				<el-form-item label="账户">
					<el-input v-model="form.username" disabled auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="form.fullname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="form.sex">
						<el-radio label="男">男</el-radio>
						<el-radio label="女">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机">
					<el-input v-model.number="form.tel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<el-select v-model="form.role" placeholder="请选择账户">
						<el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="头像">
					<single-upload default-image="/images/avatar/default.jpg" action="/api/upload/avatar/" :url.sync="form.avatar" />
				</el-form-item>
				<el-button type="primary" @click="updateInfo">修 改</el-button>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	//引入service模块
	import { User, Role } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		components: {
			SingleUpload,
		},
		data() {
			return {
				roles: [],
				form: {}
			};
		},
		created() {
			this.loadRole();
			// 双向数据绑定，vuex中的state不适合用计算属性
			this.form = { ...this.$store.state.User.userInfo };
		},
		methods: {
			async loadRole() {
				let { status, data } = await Role.list();
				if (status) {
					this.roles = data;
				}
			},
			// 修改账户信息
			updateInfo() {
				let { role } = this.form;
				this.$store.dispatch('User/Update', { ...this.form }).then((res) => {
					if (res.status) {
						sessionStorage.role = role;
						this.$message.success(res.msg);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.el-form {
		width: 70%;
		margin: 0 auto;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;

		&:hover {
			border-color: #409EFF;
		}

		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}

		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
	}
</style>
