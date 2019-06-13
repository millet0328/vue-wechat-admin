<template>
    <div>
        <Title text="用户角色"></Title>
        <el-row :gutter="10">
            <el-col :span="10">
                <el-card class="role-card">
                    <div slot="header" class="header">
                        <span>角色列表</span>
                        <el-button plain type="primary" @click="AddModalVisible = true"
                                   icon="el-icon-circle-plus-outline">添加角色
                        </el-button>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                                prop="id"
                                label="#">
                        </el-table-column>
                        <el-table-column
                                label="角色">
                            <template slot-scope="scope">
                                <el-tag>{{scope.row.role_name}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <router-link class="am-margin-right-sm" :to="{ name: 'RoleConfig', params: { id: scope.row.id }}">
                                    <el-button type="primary" plain icon="el-icon-edit"></el-button>
                                </router-link>
                                <el-button type="danger" plain @click="removeRoleHandle(scope.row.id)"
                                           icon="el-icon-delete"></el-button>
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
        <el-dialog title="添加角色" :visible.sync="AddModalVisible">
            <el-form label-width="80px" :label-position="'left'">
                <el-form-item label="名称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="AddModalVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRoleHandle">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {Role} from "@/api/index";
    import Title from '@/components/Title.vue';

    export default {
        name: "Role",
        components: {
            Title
        },
        data() {
            return {
                tableData: [],
                AddModalVisible: false,
                addForm: {
                    name: "",
                },
            }
        },
        created() {
            this.loadRole();
        },
        methods: {
            async loadRole() {
                let {status, data} = await Role.load();
                if (status) {
                    this.tableData = data;
                }
            },
            //添加角色
            async addRoleHandle() {
                let {status} = await Role.add({...this.addForm});
                if (status) {
                    this.loadRole();
                    this.AddModalVisible = false;
                }
            },
            //删除角色
            async removeRoleHandle(id) {
                let {status} = await Role.remove({id});
                if (status) {
                    this.loadRole();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .role-card {
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>