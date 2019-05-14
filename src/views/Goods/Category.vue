<template>
	<div>
		<div class="clearfix title-box am-margin-bottom-lg">
			<div class="pull-left">
				<h3 class="title">商品分类</h3>
			</div>
			<div class="pull-right">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>商品管理</el-breadcrumb-item>
					<el-breadcrumb-item>商品分类</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<!-- 树形组件 -->
		<el-tree lazy :load="loadNode" :props="defaultProps">
			<div class="node-box" slot-scope="{ node, data }">
				<span class="node-name">{{ node.label }}</span>
				<span class="node-action">
					<el-button type="text" size="mini" @click="EditModalVisible = true">
						编辑
					</el-button>
					<el-button type="text" size="mini">
						添加
					</el-button>
					<el-button type="text" size="mini">
						删除
					</el-button>
				</span>
			</div>
		</el-tree>
		<!-- 编辑Modal -->
		<el-dialog title="编辑节点" :visible.sync="EditModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload action="https://jsonplaceholder.typicode.com/posts/" class="avatar-uploader">
						<!-- <img class="avatar"> -->
						<i class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="EditModalVisible = false">取 消</el-button>
				<el-button type="primary" @click="EditModalVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				EditModalVisible: false,
			}
		},
		methods: {
			loadNode(node, resolve) {
				// 根节点level==0
				if (node.level === 0) {
					return resolve([{ name: '全部分类', id: 1 }]);
				}
				this.$http.get('/api/category/sub', {
					params: {
						pId: node.data.id
					}
				}).then((res) => {
					resolve(res.data);
				});
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.title-box {
		border-bottom: 1px solid #409eff;
	}

	.title-box h3 {
		margin-top: 0;
	}

	.node-box {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: space-between;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
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
</style>
