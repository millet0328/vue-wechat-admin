<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>菜单权限</span>
      </div>
      <el-alert title="Tips" type="warning" description="设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。" show-icon
                :closable="false">
      </el-alert>
      <!-- 树形组件 -->
      <el-tree :data="treeMenu" ref="tree" :default-expanded-keys="defaultExpandedKeys" node-key="id"
               :props="defaultProps"
               class="am-margin-top-lg">
        <div class="node-box" slot-scope="{ node, data }">
          <div class="node-name">
            {{ node.label }}
          </div>
          <div class="node-action">
            <el-popover placement="left" class="am-margin-right-sm" trigger="hover">
              <i v-if="data.icon" class="am-text-xxl" :class="`el-icon-${data.icon}`"></i>
              <div v-else class="am-text-xxl">无</div>
              <el-button slot="reference" type="text" :icon="data.icon?`el-icon-${data.icon}`:''" :disabled="data.id==1"
                         @click.stop="openIconModal(node,data)">图标
              </el-button>
            </el-popover>
            <el-button type="text" icon="el-icon-edit-outline" :disabled="data.id==1"
                       @click.stop="openEditModal(node,data)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-circle-plus-outline" @click.stop="openAddModal(node,data)">
              添加
            </el-button>
            <el-button type="text" icon="el-icon-delete" :disabled="data.id==1"
                       @click.stop="openRemoveModal(node,data)">删除
            </el-button>
            <div class="node-order am-margin-left-sm">
              显示序号：
              <el-tag size="mini">{{ data.menu_order }}</el-tag>
            </div>
          </div>
        </div>
      </el-tree>
      <!-- 编辑Modal -->
      <el-dialog title="编辑节点" :visible.sync="EditModalVisible" @closed="handleClosedDialog('editForm')">
        <el-form ref="editForm" :model="editForm" :rules="rules" label-width="80px" :label-position="'left'">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="组件名称">
            <el-input v-model="editForm.component" placeholder="指定此菜单对应的组件名称"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="editForm.path" placeholder="指定此菜单的链接地址，选填"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序" prop="menu_order">
            <el-input v-model="editForm.menu_order" placeholder="显示顺序按照数字从小到大，如2001"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="EditModalVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleEditMenu">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 选择图标Modal -->
      <el-dialog title="选择图标" width="72%" :visible.sync="IconModalVisible">
        <!-- 图标列表 -->
        <ul class="icon-list">
          <li v-for="item in icons" :key="item.id" :class="{checked:item.checked}" @click="handleCheckIcon(item)">
						<span>
							<i :class="`el-icon-${item.name}`"></i>
							<span class="icon-name">el-icon-{{ item.name }}</span>
						</span>
          </li>
        </ul>
        <!-- 分页器 -->
        <el-pagination background layout="->,prev, pager, next" :page-size="pageSize" :total="iconTotal"
                       @current-change="handlePageChange"></el-pagination>
        <div slot="footer" class="dialog-footer">
          <el-button @click="IconModalVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateIcon">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 添加Modal -->
      <el-dialog title="添加节点" :visible.sync="AddModalVisible" @closed="handleClosedDialog('addForm')">
        <el-form ref="addForm" :model="addForm" :rules="rules" label-width="80px" :label-position="'left'">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="组件名称">
            <el-input v-model="addForm.component" placeholder="指定此菜单对应的组件名称"></el-input>
          </el-form-item>
          <el-form-item label="链接地址">
            <el-input v-model="addForm.path" placeholder="指定此菜单的链接地址，选填"></el-input>
          </el-form-item>
          <el-form-item label="显示顺序" prop="menu_order">
            <el-input v-model="addForm.menu_order" placeholder="显示顺序按照数字从小到大，如2001"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="AddModalVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddMenu">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Menu, Icon } from "@/api/index";

export default {
  name: "Menu",
  data() {
    return {
      defaultProps: { label: 'name' },
      // 选择图标
      IconModalVisible: false,
      icons: [],
      pageSize: 30,
      iconTotal: 0,
      checkedIcon: {
        icon_id: '',
        icon: ''
      },
      currentNode: '',
      //默认展开
      defaultExpandedKeys: [1],
      // 编辑Modal
      EditModalVisible: false,
      editForm: {
        id: '',
        name: '',
        pId: '',
        component: '',
        path: '',
        menu_order: '',
        icon: '',
        icon_id: '',
      },
      // 添加Modal
      AddModalVisible: false,
      addForm: {
        name: "",
        pId: '',
        component: "",
        path: '',
        menu_order: '',
        icon: '',
        icon_id: '',
      },
      rules: {
        name: [{ required: true, type: 'string', message: '请输入菜单名称！', trigger: 'blur' }],
        menu_order: [
          { required: true, type: 'string', message: '请填写显示顺序！', trigger: 'blur' },
          { pattern: /^\d+$/, message: '顺序必须是数字组成！', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.loadIcons(1);
    document.title = "菜单权限";
  },
  computed: {
    ...mapGetters("Menu", ["treeMenu"]),
  },
  methods: {
    // 加载element图标
    async loadIcons(pageIndex) {
      let { status, icons, total } = await Icon.list({ pageSize: this.pageSize, pageIndex });
      if (status) {
        icons.forEach((item) => {
          // 添加选择状态--布尔值
          item.checked = false;
        });
        this.icons = icons;
        this.iconTotal = total;
      }
    },
    // 分页器改变页码数
    handlePageChange(pageIndex) {
      this.loadIcons(pageIndex);
    },
    // 打开图标选择Modal
    openIconModal(node, data) {
      this.IconModalVisible = true;
      // 转存node
      this.currentNode = node;
    },
    // 选中图标
    handleCheckIcon(data) {
      this.icons.forEach((item) => {
        // 切换选中状态
        item.checked = item === data ? !data.checked : false;
      });
      // 存储/取消选中的iconName
      this.checkedIcon.icon_id = data.checked ? data.id : '';
      this.checkedIcon.icon = data.checked ? data.name : '';
    },
    // 更新图标
    async handleUpdateIcon() {
      let { id } = this.currentNode.data;
      let { status, msg } = await this.$store.dispatch('Menu/SetIcon', { id, ...this.checkedIcon })
      if (status) {
        this.$message.success(msg);
        this.IconModalVisible = false;
      }
    },
    // 删除节点
    openRemoveModal(node, data) {
      this.$confirm('此操作将永久删除该菜单, 是否继续?', { type: 'warning', })
          .then(async () => {
            this.setDefaultExpandedKeys()
            let { status, msg } = await this.$store.dispatch('Menu/RemoveMenu', data.id);
            if (status) {
              this.$message.success(msg);
            } else {
              this.$message.error(msg);
            }
          })
          .catch(() => {
            this.$message.info('已取消删除');
          });
    },
    // 打开添加Modal获取pId
    openAddModal(node, data) {
      this.addForm.pId = data.id;
      this.AddModalVisible = true;
      // 转存data
      this.currentNode = node;
    },
    // 确认添加节点
    async handleAddMenu() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          //缓存默认展开节点
          this.setDefaultExpandedKeys();
          let { status, msg, data } = await this.$store.dispatch('Menu/CreateMenu', { ...this.addForm })
          if (!status) {
            this.$message.error(msg);
            return false;
          }
          this.$message.success(msg);
          this.AddModalVisible = false;
        }
      })
    },
    // 打开编辑Modal
    openEditModal(node, data) {
      this.EditModalVisible = true;
      //转存节点data数据
      this.editForm = { ...data };
      //删除children子节点数据，防止污染仓库state
      delete this.editForm.children;
      // 转存node节点
      this.currentNode = node;
    },
    // 编辑节点
    async handleEditMenu() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          let { status, msg } = await this.$store.dispatch('Menu/EditMenu', { ...this.editForm })
          if (!status) {
            this.$message.error(msg);
            return false;
          }
          this.$message.success(msg);
          this.EditModalVisible = false;
        }
      })
    },
    // 关闭dialog动画结束之后，清除之前的验证提示
    handleClosedDialog(formName) {
      this.$refs[formName].resetFields();
    },
    //设置默认展开节点
    setDefaultExpandedKeys() {
      // 获取树形组件实例
      let allNodes = this.$refs.tree.store._getAllNodes();
      let defaultExpandedNodes = [];
      allNodes.forEach(node => {
        node.expanded && defaultExpandedNodes.push(node.data.id);
      });
      this.defaultExpandedKeys = defaultExpandedNodes;
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
  font-size: 14px;

  .node-order {
    width: 100px;
    display: inline-block;
    font-size: 12px;
  }
}

ul.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border: solid 1px #eaeefb;
  border-radius: 4px;
}

.icon-list li {
  float: left;
  width: 10%;
  text-align: center;
  height: 100px;
  line-height: 100px;
  color: #666;
  font-size: 10px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;

  &::after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }

  span {
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", SimSun, sans-serif;
    color: #99a9bf;
    transition: color 0.15s linear;
  }

  i {
    display: block;
    font-size: 26px;
    margin-bottom: 15px;
    color: #606266;
    transition: color 0.15s linear;
  }

  .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em;
  }

  &.checked,
  &.checked:hover {
    background-color: rgb(92, 182, 255);

    span,
    i {
      color: white;
    }
  }

  &:hover {

    span,
    i {
      color: rgb(92, 182, 255);
    }
  }
}
</style>
