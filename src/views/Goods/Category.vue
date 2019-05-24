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
		<el-tree ref="tree" lazy node-key="id" :load="loadNode" :props="defaultProps">
			<div class="node-box" slot-scope="{ node, data }">
				<span class="node-name">{{ node.label }}</span>
				<span class="node-action">
					<el-button type="text" size="mini" @click.stop="openEditModal(node,data)">
						编辑
					</el-button>
					<el-button type="text" size="mini" @click.stop="openAddModal(node,data)">
						添加
					</el-button>
					<el-button type="text" size="mini" @click.stop="openDeleteModal(node,data)">
						删除
					</el-button>
				</span>
			</div>
		</el-tree>
		<!-- 编辑Modal -->
		<el-dialog title="编辑节点" :visible.sync="EditModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload class="photo-uploader" action="/api/upload/common/" :headers="headers" :on-success="editUploadSuccess"
					 :before-upload="beforeUpload" :show-file-list="false">
						<img v-if="editForm.img" :src="editForm.img" class="photo">
						<i v-else class="el-icon-plus photo-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="EditModalVisible = false">取 消</el-button>
				<el-button type="primary" @click="UpdateNodeHandle">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 添加Modal -->
		<el-dialog title="添加节点" :visible.sync="AddModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="addForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload class="photo-uploader" action="/api/upload/common/" :headers="headers" :on-success="addUploadSuccess"
					 :before-upload="beforeUpload" :show-file-list="false">
						<img v-if="addForm.img" :src="addForm.img" class="photo">
						<i v-else class="el-icon-plus photo-uploader-icon"></i>
					</el-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="AddModalVisible = false">取 消</el-button>
				<el-button type="primary" @click="AddNodeHandle">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Category } from '@/api/index';
	export default {
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				EditModalVisible: false,
				editForm: {
					name: "",
					pId: '',
					img: ''
				},
				AddModalVisible: false,
				addForm: {
					name: "",
					pId: '',
					img: ''
				},
				currentNodeData: '',
				currentNode: '',
			}
		},
		methods: {
			loadNode(node, resolve) {
				// 根节点level==0
				if (node.level === 0) {
					return resolve([{ name: '全部分类', id: 1, img: '' }]);
				}
				Category.load({ pId: node.data.id }).then((res) => {
					resolve(res.data);
				})
			},
			// 打开编辑Modal
			openEditModal(node, data) {
				this.EditModalVisible = true;
				this.editForm = { ...data };
				// 转存node节点
				this.currentNode = node;
			},
			// 更新节点
			UpdateNodeHandle() {
				Category.update({ ...this.editForm }).then((res) => {
					if (res.status) {
						this.$message.success(res.msg);
						this.EditModalVisible = false;
						// 更新节点
						this.currentNode.data = { ...this.editForm }
					}
				})
			},
			// 打开添加Modal获取pId
			openAddModal(node, data) {
				this.addForm.pId = data.id;
				this.AddModalVisible = true;
				// 转存data
				this.currentNodeData = data;
			},
			// 确认添加节点
			AddNodeHandle() {
				// 1.表单验证
				// 2.发送数据
				Category.add({ ...this.addForm }).then((res) => {
					if (!res.status) {
						this.$message.error(res.msg);
						return;
					}
					this.$message.success(res.msg);
					this.AddModalVisible = false;
					// 添加子节点
					let data = this.currentNodeData;
					let newChild = { ...this.addForm, ...res.data };
					if (!data.children) {
						this.$set(data, 'children', []);
					}
					data.children.push(newChild);
				})
			},
			// 删除
			openDeleteModal(node, data) {
				this.$msgbox({
						type: 'warning',
						title: "",
						message: '此操作将永久删除该分类, 是否继续?'
					})
					.then(() => {
						Category.remove({ id: data.id }).then(res => {
							if (res.status) {
								node.remove();
								this.$message({
									type: 'success',
									message: '删除成功!'
								});
							}
						})

					})
			},
			// 上传图片之前的检查
			beforeUpload(file) {
				const isJPG = file.type === 'image/jpeg' || 'image/png';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 添加Modal上传成功
			addUploadSuccess(res, file) {
				this.addForm.img = res.src;
			},
			// 编辑Modal上传成功
			editUploadSuccess(res, file) {
				this.editForm.img = res.src;
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.title-box {
		border-bottom: 1px solid #409eff;

		h3 {
			margin-top: 0;
		}
	}

	.node-box {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: space-between;

		.node-name {
			font-size: 14px;
		}
	}

	.photo-uploader {
		.el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;

			&:hover {
				border-color: #409EFF;
			}

			.photo-uploader-icon {
				font-size: 28px;
				color: #8c939d;
				width: 178px;
				height: 178px;
				line-height: 178px;
				text-align: center;
			}

			.photo {
				width: 178px;
				height: 178px;
				display: block;
			}
		}
	}
</style>
