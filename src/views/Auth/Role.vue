<template>
    <el-row>
        <el-col :span="8">
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
                        <router-link to="/auth/role/config/">
                            <el-button type="primary" icon="el-icon-edit"></el-button>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="16">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script>
    import {Role} from "@/api/index";

    export default {
        name: "Role",
        data() {
            return {
                tableData: []
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
        }
    }
</script>

<style>

</style>