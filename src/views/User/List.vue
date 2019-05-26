<template>
	<div>
		<div class="clearfix am-margin-bottom-lg">
			<div class="pull-left">
				<h3 class="title">客户列表</h3>
			</div>
			<div class="pull-right">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>用户管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<el-form :inline="true" class="">
			<el-form-item>
				<el-input placeholder="手机号码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table ref="multipleTable" style="width: 100%" :data="tableData">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column sortable label="头像">
				<template slot-scope="scope">
					<img :src="scope.row.avatar" width="60" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="username" sortable label="账号">
			</el-table-column>
			<el-table-column prop="nickname" sortable label="昵称">
			</el-table-column>
			<el-table-column prop="sex" sortable label="性别" width="120">
			</el-table-column>
			<el-table-column prop="tel" sortable label="手机号码">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="primary" @click="showEditModal" plain icon="el-icon-edit" size="small"></el-button>
					<el-button icon="el-icon-delete" type="danger" plain size="small"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="120">
		</el-pagination>
		<!--编辑数据-->
		<el-dialog title="收货地址" :visible.sync="editModalShow">
			<el-form :model="form" label-position="left">
				<el-form-item label="账号" label-width="100px">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="昵称" label-width="100px">
					<el-input v-model="form.nickname" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" label-width="100px">
					<el-radio-group v-model="form.sex">
						<el-radio label="男">男</el-radio>
						<el-radio label="女">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号码" label-width="100px">
					<el-input v-model.number="form.tel" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限" label-width="100px">
					<el-select v-model="form.role" placeholder="请选择账户">
						<el-option v-for="item in roles" :key="item.id" :label="item.role_name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="editModalShow = false">确 定</el-button>
			</div>
		</el-dialog>
		<!--确认删除-->

	</div>

</template>

<script>
	//引入service模块
	import { User, Authority } from '@/api/index'
	export default {
		name: "list",
		data() {
			return {
				tableData: [],
				roles: [],
				editModalShow: true,
				form: {
					name: "",
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
		},
		methods: {
			loadList(index) {
				User.list()
					.then((res) => {
						if (res.status) {
							this.tableData = res.data;
						}
					});
			},
			loadRole() {
				Authority.loadRole()
					.then(res => {
						if (res.status) {
							this.roles = res.data;
						}
					});
			},
			showEditModal() {
				this.editModalShow = true;
			},
			handleEdit(index, row) {
				this.editing = true;
				this.form = row;
			},
			handleDelete(index, row) {
				this.confirmVisible = true;
				console.log(index, row);
			},
		}
	};
</script>

<style scoped>
	.title {
		margin: 0;
	}
</style>
