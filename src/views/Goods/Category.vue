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
		<el-dialog title="编辑节点" :before-close="closeModal" :visible.sync="EditModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="EditForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload class="photo-uploader" action="/api/upload/common/" :headers="headers" :on-success="uploadSuccess"
					 :before-upload="beforeUpload" :show-file-list="false">
						<img v-if="EditForm.img" :src="EditForm.img" class="photo">
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
		<el-dialog title="添加节点" :before-close="closeModal" :visible.sync="AddModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="AddForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload class="photo-uploader" action="/api/upload/common/" :headers="headers" :on-success="uploadSuccess"
					 :before-upload="beforeUpload" :show-file-list="false">
						<img v-if="AddForm.img" :src="AddForm.img" class="photo">
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
				EditForm: {
					name: "",
					pId: '',
					img: ''
				},
				AddModalVisible: false,
				AddForm: {
					name: "",
					pId: '',
					img: ''
				},
				currentNodeData: '',
			}
		},
		methods: {
			loadNode(node, resolve) {
				// 根节点level==0
				if (node.level === 0) {
					return resolve([{ name: '全部分类', id: 1, img: '' }]);
				}
				this.$http.get('/api/category/sub', {
					params: {
						pId: node.data.id
					}
				}).then((res) => {
					resolve(res.data);
				});
			},
			// 打开编辑Modal
			openEditModal(node, data) {
				this.EditModalVisible = true;
				this.EditForm = { ...data };
				// 转存node节点
				this.currentNode = node;
			},
			// 更新节点
			UpdateNodeHandle() {
				this.$http
					.post('/api/category/update/', {
						...this.EditForm
					})
					.then((res) => {
						if (res.status) {
							this.$message(res.msg);
							this.EditModalVisible = false;
							// 更新节点
							this.currentNode.data = { ...this.EditForm }
						}
					});
			},
			// 关闭弹窗清空表单
			closeModal(done) {
				done();
			},
			// 打开添加Modal获取pId
			openAddModal(node, data) {
				this.AddForm.pId = data.id;
				this.AddModalVisible = true;
				// 转存data
				this.currentNodeData = data;
			},
			// 确认添加节点
			AddNodeHandle() {
				// 1.表单验证
				// 2.发送数据
				this.$http
					.post("/api/category/add/", {
						...this.AddForm
					})
					.then((res) => {
						if (res.status) {
							this.$message(res.msg);
							this.AddModalVisible = false;
							// 添加子节点
							let data = this.currentNodeData;
							let newChild = { ...this.AddForm, ...res.data };
							if (!data.children) {
								this.$set(data, 'children', []);
							}
							data.children.push(newChild);
						}
					});
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
			// 上传成功
			uploadSuccess(res, file) {
				console.log(res);
				this.AddForm.img = res.data[0];
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
