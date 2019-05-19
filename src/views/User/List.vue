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
		<el-table ref="multipleTable" tooltip-effect="dark" style="width: 100%" :data="tableData">
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
					<el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
					<el-button icon="el-icon-delete" type="danger" plain size="small"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next" :total="120">
		</el-pagination>
		<!--新增数据-->

		<!--编辑数据-->

		<!--确认删除-->

	</div>

</template>

<script>
	//引入service模块
	export default {
		name: "list",
		data() {
			return {
				tableData: [],
				form: {
					name: "",
					sex: "",
					age: 0,
					birthday: "",
					address: ""
				},
			};
		},
		created() {
			this.loadList();
		},
		methods: {
			loadList(index) {
				this.$http
					.get("/api/user/list")
					.then((res) => {
						if (res.status) {
							this.tableData = res.data;
						}
					});
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
