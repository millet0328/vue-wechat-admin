<template>
	<div>
		<el-row :gutter="10">
			<el-col :span="10">
				<el-card class="role-card">
					<div slot="header" class="header">
						<span>角色列表</span>
						<el-button plain type="primary" @click="AddModalVisible = true" icon="el-icon-circle-plus-outline">添加角色
						</el-button>
					</div>
					<el-table :data="tableData" style="width: 100%">
						<el-table-column prop="id" label="#">
						</el-table-column>
						<el-table-column label="角色">
							<template slot-scope="scope">
								<el-tag :type="scope.row.id===1?'danger':''">{{scope.row.name}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column width="180" label="操作">
							<template slot-scope="scope">
								<el-button :disabled="scope.row.id===1" type="primary" plain @click="openEditModal(scope.row)" icon="el-icon-edit"></el-button>
								<el-button :disabled="scope.row.id===1" type="danger" plain @click="openDeleteModal(scope.row.id)" icon="el-icon-delete"></el-button>
								<router-link class="am-margin-left-sm" :to="{ name: 'RoleConfig', params: { id: scope.row.id }}">
									<el-button type="primary" plain icon="el-icon-setting"></el-button>
								</router-link>
							</template>
						</el-table-column>
					</el-table>
				</el-card>
			</el-col>
			<el-col :span="14">
				<router-view></router-view>
			</el-col>
		</el-row>
		<!-- 添加Modal -->
		<el-dialog title="添加角色" :visible.sync="AddModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="AddModalVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRoleHandle">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 编辑Modal -->
		<el-dialog title="编辑角色" :visible.sync="EditModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="EditModalVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateRoleHandle">确 定</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { Role } from "@/api/index";

	export default {
		name: "Role",
		data() {
			return {
				tableData: [],
				AddModalVisible: false,
				addForm: {
					name: "",
				},
				EditModalVisible: false,
				editForm: {
					id: "",
					name: "",
				},
			}
		},
		created() {
			this.loadRole();
			document.title = "用户角色";
		},
		methods: {
			async loadRole() {
				let { status, data } = await Role.list();
				if (status) {
					this.tableData = data;
				}
			},
			//添加角色
			async addRoleHandle() {
				let { status } = await Role.add({ ...this.addForm });
				if (status) {
					this.loadRole();
					this.AddModalVisible = false;
				}
			},
			//打开编辑Modal
			openEditModal(data) {
				this.EditModalVisible = true;
				this.editForm = { ...data };
			},
			//编辑角色
			async updateRoleHandle() {
				let { status } = await Role.update({ ...this.editForm });
				if (status) {
					this.loadRole();
					this.EditModalVisible = false;
				}
			},
			// 确认删除
			openDeleteModal(id) {
				this.$confirm('此操作将永久删除该角色及其关联账户, 是否继续？', {
						type: 'warning',
					})
					.then(async () => {
						let { status } = await Role.remove({ id });
						if (status) {
							this.loadRole();
							this.$message.success('删除成功!');
						}
					})
					.catch(() => {
						this.$message.info('已取消删除');
					});
			},
		}
	}
</script>

<style lang="less" scoped>
	.role-card {
		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
</style>
