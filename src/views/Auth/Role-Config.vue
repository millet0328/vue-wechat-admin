<template>
    <div>
        <el-card class="am-margin-bottom-sm" v-for="(item,index) in menu">
            <div slot="header" class="menu-header">
                <div class="menu-title am-text-sm">
                    <i class="el-icon-collection-tag"></i>
                    {{item.name}}
                </div>
                <el-switch @change="parentHandle(item)" v-model="item.checked"></el-switch>
            </div>
            <el-row :gutter="40">
                <el-col v-for="element in item.children">
                    <div class="menu-box am-padding-vertical-xs">
                        <div class="am-text-xs">{{element.name}}</div>
                        <el-switch @change="childHandle(element,item)" v-model="element.checked"></el-switch>
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
            this.loadRoleConfig();
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'loadRoleConfig'
        },
        methods: {
            async loadRoleConfig() {
                let {status, data} = await Role.loadConfig({id: this.id});
                if (status) {
                    this.menu = data;
                }
            },
            /*
            * 父级菜单switch
            * nodeData      父级菜单
            * */
            async parentHandle({checked, children, id}) {
                //修改父级菜单
                if (checked) {
                    let {status} = await Role.putMenu({role_id: this.id, menu_id: id});
                } else {
                    let {status} = await Role.deleteMenu({role_id: this.id, menu_id: id});
                }
                //所有子级跟随父级状态改变
                children.forEach(async (item) => {
                    item.checked = checked;
                    if (checked) {
                        let {status} = await Role.putMenu({role_id: this.id, menu_id: item.id});
                    } else {
                        let {status} = await Role.deleteMenu({role_id: this.id, menu_id: item.id});
                    }
                });
            },
            /*
            * 子级菜单switch,子级菜单有一个选中，父级选中
            * nodeData    子级data
            * parentData  父级data
            * */
            async childHandle({checked, id}, parentData) {
                //检测子级菜单中是否有选中状态
                let num = parentData.children.reduce((total, item) => {
                    if (item.checked) {
                        total++;
                    }
                    return total;
                }, 0);
                switch (num) {
                    case 0:
                        await Role.deleteMenu({role_id: this.id, menu_id: parentData.id});
                        parentData.checked = false;
                        break;
                    case 1:
                        await Role.putMenu({role_id: this.id, menu_id: parentData.id});
                        parentData.checked = true;
                        break;
                    default:
                        break;
                }
                if (checked) {
                    let {status} = await Role.putMenu({role_id: this.id, menu_id: id});
                } else {
                    let {status} = await Role.deleteMenu({role_id: this.id, menu_id: id});
                }

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