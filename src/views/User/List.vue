<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#">
				</el-table-column>
				<el-table-column sortable label="头像">
					<template slot-scope="scope">
						<img :src="scope.row.avatar" class="avatar" width="60" alt="">
					</template>
				</el-table-column>
				<el-table-column prop="username" sortable label="账号">
				</el-table-column>
				<el-table-column prop="fullname" sortable label="姓名">
				</el-table-column>
				<el-table-column prop="sex" sortable label="性别">
				</el-table-column>
				<el-table-column prop="tel" sortable label="手机">
				</el-table-column>
				<el-table-column prop="role_name" sortable label="角色">
					<template slot-scope="scope">
						<el-tag :type="scope.row.role===1?'danger':''">{{scope.row.role_name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="login_time" width="160" sortable label="上次登录">
				</el-table-column>
				<el-table-column prop="login_count" sortable label="登录次数">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="showEditModal(scope.row)" plain icon="el-icon-edit" size="small" type="primary"></el-button>
						<el-button @click="showDeleteModal(scope.row.id)" :disabled="scope.row.id==1" icon="el-icon-delete" plain size="small"
						 type="danger"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!--编辑数据-->
		<el-dialog title="修改信息" :visible.sync="editModalShow">
			<el-form :model="form" label-position="left" label-width="80px">
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
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="updateInfo">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	//引入service模块
	import { User, Role } from '@/api/index'
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		name: "List",
		components: {
			SingleUpload,
		},
		data() {
			return {
				tableData: [],
				roles: [],
				editModalShow: false,
				form: {
					id: "",
					nickname: "",
					sex: "男",
					tel: "",
					role: "",
					avatar: "",
				},
			};
		},
		created() {
			this.loadList();
			this.loadRole();
			document.title = "用户列表";
		},
		methods: {
			async loadList() {
				let { status, data } = await User.list();
				if (status) {
					this.tableData = data;
				}
			},
			async loadRole() {
				let { status, data } = await Role.list();
				if (status) {
					this.roles = data;
				}
			},
			showEditModal(row) {
				this.editModalShow = true;
				this.form = { ...row };
			},
			showDeleteModal(id) {
				this.$confirm('此操作将永久删除该账户, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						let { status, msg } = await User.remove({ id });
						if (status) {
							this.$message.success('删除成功！');
							this.loadList();
						}
					})
					.catch(() => {
						this.$message.info('已取消删除');
					});
			},
			// 修改账户信息
			async updateInfo() {
				let { status, msg } = await User.update({ ...this.form });
				if (status) {
					this.editModalShow = false;
					this.$message.success(msg);
					this.loadList();
				}
			},
		}
	};
</script>

<style scoped>
	.cell .avatar {
		border-radius: 50%;
	}
</style>
