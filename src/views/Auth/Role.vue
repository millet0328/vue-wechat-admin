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
          <el-table :data="tableData">
            <el-table-column prop="id" label="#">
            </el-table-column>
            <el-table-column label="角色">
              <template slot-scope="scope">
                <el-tag :type="scope.row.id===1?'danger':''">{{ scope.row.name }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="180" label="操作">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.id===1" type="primary" plain
                           @click="openEditModal(scope.row,scope.$index)"
                           icon="el-icon-edit"></el-button>
                <el-button :disabled="scope.row.id===1" type="danger" plain
                           @click="openDeleteModal(scope.row.id,scope.$index)"
                           icon="el-icon-delete"></el-button>
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
    <el-dialog title="添加角色" :visible.sync="AddModalVisible" @closed="handleClosedDialog('addForm')">
      <el-form ref="addForm" :model="addForm" :rules="rules" :label-position="'left'" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AddModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑Modal -->
    <el-dialog title="编辑角色" :visible.sync="EditModalVisible" @closed="handleClosedDialog('editForm')">
      <el-form ref="editForm" :model="editForm" :rules="rules" :label-position="'left'" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="EditModalVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateRole">确 定</el-button>
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
      rules: {
        name: [{ required: true, message: "请输入角色名称", trigger: 'blur' }]
      },
      currentIndex: "",
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
    handleAddRole() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          let { status, data } = await Role.add({ ...this.addForm });
          if (status) {
            this.tableData.push({ ...data, ...this.addForm });
            this.AddModalVisible = false;
            this.$message.success('添加成功!');
          }
        }
      })
    },
    //打开编辑Modal
    openEditModal(roleData, index) {
      this.EditModalVisible = true;
      this.editForm = { ...roleData };
      this.currentIndex = index;
    },
    //编辑角色
    async handleUpdateRole() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          let { status, msg } = await Role.update(this.editForm.id, { ...this.editForm });
          if (status) {
            this.$set(this.tableData, this.currentIndex, { ...this.editForm });
            this.EditModalVisible = false;
            this.$message.success('编辑成功!');
          }
        }
      })
    },
    // 确认删除
    openDeleteModal(id, index) {
      this.$confirm('此操作将永久删除该角色及其关联账户, 是否继续？', {
        type: 'warning',
      })
          .then(async () => {
            let { status } = await Role.remove(id);
            if (status) {
              this.tableData.splice(index, 1);
              this.$message.success('删除成功!');
            }
          })
          .catch(() => {
            this.$message.info('已取消删除');
          });
    },
    // 关闭dialog动画结束之后，清除之前的验证提示
    handleClosedDialog(formName) {
      this.$refs[formName].resetFields();
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
