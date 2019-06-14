<template>
    <div>
        <el-card class="am-margin-bottom-sm" v-for="(item,index) in menu">
            <div slot="header" class="menu-header">
                <div class="menu-title am-text-sm">
                    <i class="el-icon-collection-tag"></i>
                    {{item.name}}
                </div>
                <el-switch @change="parentHandle(item.checked,item)" v-model="item.checked"></el-switch>
            </div>
            <el-row :gutter="40">
                <el-col v-for="element in item.children">
                    <div class="menu-box am-padding-vertical-xs">
                        <div class="am-text-xs">{{element.name}}</div>
                        <el-switch @change="childHandle(element.checked,item)" v-model="element.checked"></el-switch>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    import {Role} from "@/api/index";

    export default {
        name: "Role-Setting",
        props: ["id"],
        data() {
            return {
                menu: [],
            };
        },
        created() {
            this.loadRoleConfig(this.id);
        },
        methods: {
            async loadRoleConfig(id) {
                let {status, data} = await Role.loadConfig({id});
                if (status) {
                    this.menu = data;
                }
            },
            /*
            * 父级菜单switch
            * status    switch状态
            * children      子级菜单集合
            * */
            parentHandle(status, {children}) {
                //所有子级跟随父级状态改变
                children.forEach(function (item) {
                    item.checked = status;
                });
            },
            /*
            * 子级菜单switch,子级菜单有一个选中，父级选中
            * status    switch状态
            * parentData      父级data
            * */
            childHandle(status, parentData) {
                //检测子级菜单中是否有选中状态
                let flag = parentData.children.some(item => item.checked);
                parentData.checked = flag;
            },
        },
    }
</script>

<style lang="scss" scoped>
    .menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .menu-title {
            color: #409EFF;
        }
    }

    .menu-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #909399;
    }
</style>