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
						<el-button type="text" icon="el-icon-edit-outline" size="mini" :disabled="data.id==1"
                       @click.stop="openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-circle-plus-outline" size="mini" @click.stop="openAddModal(node,data)">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" :disabled="data.id==1"
                       @click.stop="openDeleteModal(node,data)">
							删除
						</el-button>
					</span>
        </div>
      </el-tree>
    </el-card>
    <!-- 编辑Modal -->
    <el-dialog title="编辑节点" :visible.sync="editModalVisible" :before-close="handleBeforeCloseDialog"
               @closed="handleClosedDialog('editForm')">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px" :label-position="'left'">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <single-upload :data="{type:'common'}" action="/api/upload/common/" :url.sync="editForm.img"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseDialog">取 消</el-button>
        <el-button type="primary" @click="handleUpdateNode">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加Modal -->
    <el-dialog title="添加节点" :visible.sync="addModalVisible" @closed="handleClosedDialog('addForm')">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px" :label-position="'left'">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="img">
          <single-upload :data="{type:'common'}" action="/api/upload/common/" :url.sync="addForm.img"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddNode">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Category } from '@/api/';
import SingleUpload from '@/components/SingleUpload.vue';

export default {
  components: {
    SingleUpload
  },
  data() {
    // 图片验证插件
    var validateImage = (rule, value, callback) => {
      // 只在level === 4时，需要上传图片
      if (this.currentLevel != 4) {
        return callback();
      }
      // 空值校验
      if (value === '') {
        callback(new Error('请上传一张分类图片!'));
      }
      // 有效值，通过验证
      callback();
    };
    return {
      defaultProps: { label: 'name', },
      headers: { Authorization: `Bearer ${sessionStorage.token}` },
      editModalVisible: false,
      editForm: {
        name: "",
        pId: '',
        img: ''
      },
      addModalVisible: false,
      addForm: {
        name: "",
        pId: '',
        img: ''
      },
      rules: {
        name: [{ required: true, message: '请输入分类的名称！', trigger: 'blur' }],
        img: [{ validator: validateImage, trigger: 'blur' }],
      },
      currentNode: '',
      currentLevel: -1,
    }
  },
  created() {
    document.title = "商品分类";
  },
  methods: {
    // 懒加载节点
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
      this.editModalVisible = true;
      this.editForm = { ...data };
      // 转存node节点
      this.currentNode = node;
      //存储操作层级
      this.currentLevel = node.level;
    },
    // 更新节点
    handleUpdateNode() {
      // 表单验证
      this.$refs.editForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        let { status, msg } = await Category.update(this.editForm.id, { ...this.editForm });
        if (status) {
          this.$message.success(msg);
          this.editModalVisible = false;
          // 更新DOM
          this.currentNode.data = { ...this.editForm }
        }
      });
    },
    // 打开添加Modal获取pId
    openAddModal(node, data) {
      this.addForm.pId = data.id;
      this.addModalVisible = true;
      // 转存data
      this.currentNode = node;
      //存储操作层级
      this.currentLevel = node.level;
    },
    // 确认添加节点
    handleAddNode() {
      // 1.表单验证
      this.$refs.addForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        // 2.发送数据
        let { status, msg, data } = await Category.add({ ...this.addForm });
        if (!status) {
          this.$message.error(msg);
          return;
        }
        this.$message.success(msg);
        this.addModalVisible = false;
        // 3.树形结构添加子节点
        this.$refs.tree.append({ ...this.addForm, ...data }, this.currentNode);
      });
    },
    // 删除节点
    openDeleteModal(node, data) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', { type: 'warning' })
          .then(async () => {
            let { status, msg } = await Category.remove(data.id);
            if (status) {
              node.remove();
              this.$message.success(msg);
            } else {
              this.$message.error(msg);
            }
          })
          .catch(() => {
            this.$message.info('已取消删除');
          });
    },
    // 校验图片是否为空
    checkImage() {
      // currentLevel = 4 需要上传图片
      if (this.currentLevel != 4) {
        return Promise.resolve(true);
      }
      return new Promise((resolve, reject) => {
        this.$refs.editForm.validateField('img', (msg) => {
          if (msg) {
            this.$message.error(msg);
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    },
    // 关闭编辑dialog之前，校验图片是否删除
    async handleBeforeCloseDialog(done) {
      let isValid = await this.checkImage();
      if (isValid) {
        done()
      }
    },
    // 关闭编辑dialog
    async handleCloseDialog() {
      let isValid = await this.checkImage();
      this.editModalVisible = !isValid;
    },
    // 关闭dialog动画结束之后，清除之前的验证提示
    handleClosedDialog(formName) {
      this.$refs[formName].resetFields();
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
</style>
