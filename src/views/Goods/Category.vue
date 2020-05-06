<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商品分类</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" :default-expanded-keys="[1]" lazy node-key="id" :load="loadNode" :props="defaultProps">
				<div class="node-box" slot-scope="{ node, data }">
					<span class="node-name">{{ node.label }}</span>
					<span class="node-action">
						<el-button type="text" icon="el-icon-edit-outline" size="mini" :disabled="data.id==1" @click.stop="openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="openAddModal(node,data)">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" :disabled="data.id==1" @click.stop="openDeleteModal(node,data)">
							删除
						</el-button>
					</span>
				</div>
			</el-tree>
		</el-card>
		<!-- 编辑Modal -->
		<el-dialog title="编辑节点" :visible.sync="EditModalVisible">
			<el-form label-width="80px" :label-position="'left'">
				<el-form-item label="名称">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<single-upload action="/api/upload/common/" :url.sync="editForm.img" />
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
					<single-upload action="/api/upload/common/" :url.sync="addForm.img" />
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
	import SingleUpload from '@/components/SingleUpload.vue';
	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				defaultProps: {
					label: 'name',
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
		created() {
			document.title = "商品分类";
		},
		methods: {
			async loadNode(node, resolve) {
				// 根节点level==0
				if (node.level === 0) {
					let { data } = await Category.load({ pId: 0 });
					return resolve(data);
				}
				let { data } = await Category.load({ pId: node.data.id });
				resolve(data);
			},
			// 打开编辑Modal
			openEditModal(node, data) {
				this.EditModalVisible = true;
				this.editForm = { ...data };
				// 转存node节点
				this.currentNode = node;
			},
			// 更新节点
			async UpdateNodeHandle() {
				let { status, msg } = await Category.update({ ...this.editForm });
				if (status) {
					this.$message.success(msg);
					this.EditModalVisible = false;
					// 更新节点
					this.currentNode.data = { ...this.editForm }
				}
			},
			// 打开添加Modal获取pId
			openAddModal(node, data) {
				this.addForm.pId = data.id;
				this.AddModalVisible = true;
				// 转存data
				this.currentNode = node;
			},
			// 确认添加节点
			async AddNodeHandle() {
				// 1.表单验证
				// 2.发送数据
				let { status, msg, data } = await Category.add({ ...this.addForm });
				if (!status) {
					this.$message.error(msg);
					return;
				}
				this.$message.success(msg);
				this.AddModalVisible = false;
				// 树形结构添加子节点
				this.$refs.tree.append({ ...this.addForm, ...data }, this.currentNode);
				//清空表单
				this.addForm = { name: "", pId: '', img: '' };
			},
			// 删除
			openDeleteModal(node, data) {
				this.$confirm('此操作将永久删除该分类, 是否继续?', {
						type: 'warning',
					})
					.then(async () => {
						let { status } = await Category.remove({ id: data.id });
						if (status) {
							node.remove();
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
