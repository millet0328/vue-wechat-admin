<template>
    <div>
        <Title text="菜单权限"></Title>
        <el-alert title="Tips" type="warning" description="设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。" show-icon
                  :closable="false">
        </el-alert>
        <!-- 树形组件 -->
        <el-tree class="am-margin-top-lg" ref="tree" :default-expanded-keys="[1]" lazy node-key="id" :load="loadNode"
                 :props="defaultProps">
            <div class="node-box" slot-scope="{ node, data }">
                <div class="node-name">
                    {{ node.label }}
                </div>
                <div class="node-action">
                    <div class="node-order">显示序号：
                        <el-tag size="mini">{{ data.order }}</el-tag>
                    </div>
                    <el-button type="text" size="mini" :disabled="data.id==1"
                               @click.stop="openEditModal(node,data)">编辑
                    </el-button>
                    <el-button type="text" size="mini"
                               @click.stop="openAddModal(node,data)">添加
                    </el-button>
                    <el-button type="text" size="mini" :disabled="data.id==1"
                               @click.stop="openDeleteModal(node,data)">删除
                    </el-button>
                </div>
            </div>
        </el-tree>
        <!-- 编辑Modal -->
        <el-dialog title="编辑节点" :visible.sync="EditModalVisible">
            <el-form label-width="80px" :label-position="'left'">
                <el-form-item label="菜单名称">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="链接地址">
                    <el-input v-model="editForm.path" placeholder="指定此菜单的链接地址，选填"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序">
                    <el-input v-model="editForm.order" placeholder="显示顺序按照数字从小到大，如2001"></el-input>
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
                <el-form-item label="菜单名称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="链接地址">
                    <el-input v-model="addForm.path" placeholder="指定此菜单的链接地址，选填"></el-input>
                </el-form-item>
                <el-form-item label="显示顺序">
                    <el-input v-model="addForm.order" placeholder="显示顺序按照数字从小到大，如2001"></el-input>
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
    import {Menu} from "@/api/index";
    import Title from '@/components/Title.vue';

    export default {
        name: "Menu",
        components: {
            Title
        },
        data() {
            return {
                defaultProps: {
                    label: 'name'
                },
                EditModalVisible: false,
                editForm: {
                    name: "",
                    pId: '',
                    path: '',
                    order: '',
                },
                AddModalVisible: false,
                addForm: {
                    name: "",
                    pId: '',
                    path: '',
                    order: '',
                },
                currentNodeData: '',
                currentNode: '',
            }
        },
        methods: {
            async loadNode(node, resolve) {
                // 根节点level==0
                if (node.level === 0) {
                    let {data} = await Menu.load({pId: 0});
                    return resolve(data);
                }
                let {data} = await Menu.load({pId: node.data.id});
                resolve(data);
            },
            // 打开编辑Modal
            openEditModal(node, data) {
                this.EditModalVisible = true;
                this.editForm = {...data};
                // 转存node节点
                this.currentNode = node;
            },
            // 打开添加Modal获取pId
            openAddModal(node, data) {
                this.addForm.pId = data.id;
                this.AddModalVisible = true;
                // 转存data
                this.currentNodeData = data;
            },
            // 删除节点
            openDeleteModal(node, data) {
                this.$msgbox({
                    type: 'warning',
                    title: "",
                    message: '此操作将永久删除该分类, 是否继续?'
                }).then(async () => {
                    let {status} = await Menu.remove({id: data.id});
                    if (status) {
                        node.remove();
                        this.$message.success('删除成功!');
                    }
                })
            },
            // 确认添加节点
            async AddNodeHandle() {
                let {status, msg, data} = await Menu.add({...this.addForm});
                if (!status) {
                    this.$message.error(msg);
                    return false;
                }
                this.$message.success(msg);
                this.AddModalVisible = false;
                // 添加子节点
                let nodeData = this.currentNodeData;
                let newChild = {...this.addForm, ...data};
                if (!nodeData.children) {
                    this.$set(nodeData, 'children', []);
                }
                nodeData.children.push(newChild);
                //清空表单
                this.addForm = {name: "", pId: '', path: ''};
            },
            // 更新节点
            async UpdateNodeHandle() {
                let {status, msg} = await Menu.update({...this.editForm});
                if (status) {
                    this.$message.success(msg);
                    this.EditModalVisible = false;
                    // 更新节点
                    this.currentNode.data = {...this.editForm}
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .node-box {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;

        .node-order {
            width: 180px;
            display: inline-block;
            font-size: 12px;
        }
    }
</style>