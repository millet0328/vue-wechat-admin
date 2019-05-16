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
			<el-table-column type="index">
			</el-table-column>
			<el-table-column sortable label="头像">
				<template slot-scope="scope">
					<img src="../../assets/img/common/avator.png" width="60" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="name" sortable label="账号">
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
		<el-dialog title="新增客户" :visible.sync="adding">
			<el-form :model="form" :rules="rules" ref="ruleForm" :label-position="'left'" label-width="80px">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-radio-group v-model="form.age">
						<el-input type="age" v-model.number="form.age" auto-complete="off"></el-input>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="生日" prop="birthday">
					<el-radio-group v-model="form.birthday">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input type="textarea" v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="adding = false">取 消</el-button>
				<el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>

			</div>
		</el-dialog>
		<!--编辑数据-->
		<el-dialog title="编辑客户" :visible.sync="editing">
			<el-form :model="form" :rules="rules" ref="ruleForm" :label-position="'left'" label-width="80px">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="form.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄" prop="age">
					<el-radio-group v-model="form.age">
						<el-input type="age" v-model.number="form.age" auto-complete="off"></el-input>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="生日" prop="birthday">
					<el-radio-group v-model="form.birthday">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="地址" prop="address">
					<el-input type="textarea" v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editing = false">取 消</el-button>
				<el-button type="primary" @click="updateForm('ruleForm')">保 存</el-button>
			</div>
		</el-dialog>
		<!--确认删除-->
		<el-dialog title="提示" :visible.sync="confirmVisible" width="30%">
			<span>确认删除该记录吗?</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="confirmVisible = false">取 消</el-button>
				<el-button type="primary" @click="confirmDelete">确 定</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	//引入service模块
	export default {
		name: "list",
		data() {
			const item = {
				name: "moz",
				nickname: "o(´^｀)o",
				tel: "15863008280",
				sex: "男",
				age: 30,
				birthday: "2016-05-02",
				address: "上海市普陀区金沙江路 1518 弄"
			};
			return {
				tableData: Array(10).fill(item),
				adding: false,
				editing: false,
				confirmVisible: false,
				form: {
					name: "",
					sex: "",
					age: 0,
					birthday: "",
					address: ""
				},
				rules: {
					name: [{
							required: true,
							message: "请输入客户姓名",
							trigger: "blur"
						},
						{
							min: 3,
							max: 5,
							message: "长度在 3 到 5 个字符",
							trigger: "blur"
						}
					],
					sex: [{
						required: true,
						message: "请选择性别",
						trigger: "change"
					}],
					age: [{
							required: true,
							message: "年龄不能为空"
						},
						{
							type: "integer",
							min: 0,
							max: 150,
							message: "年龄必须为0~150之间的正整数"
						}
					],
					birthday: [{
						required: true,
						message: "请选择出生日期",
						trigger: "change"
					}],
					address: [{
						required: true,
						message: "请填写具体地址",
						trigger: "blur"
					}]
				}
			};
		},
		methods: {
			handleNew() {
				this.adding = true;
				this.form = {};
			},
			handleEdit(index, row) {
				this.editing = true;
				this.form = row;
			},
			handleDelete(index, row) {
				this.confirmVisible = true;
				console.log(index, row);
			},
			//需要传递删除项的index
			confirmDelete() {},
			updateForm(formName) {},
			submitForm(formName) {
				this.$refs[formName].validate(valid => {
					if (valid) {
						//ajax提交数据
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			}
		}
	};
</script>

<style scoped>
	.title {
		margin: 0;
	}
</style>
