// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(Router)
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 1. import 进来views文件夹下的页面级组件。
// 用户组
import UserLogin from '@/views/User/Login.vue';
import UserRegister from '@/views/User/Register.vue';
import UserList from '@/views/User/List.vue';
import UserInfo from '@/views/User/Info.vue';
// 订单
import OrderList from '@/views/Order/List.vue';
// 管理员
import Index from '@/views/Index.vue';
// 商品
import GoodsCategory from '@/views/Goods/Category.vue';
import GoodsList from "@/views/Goods/List";
import GoodsRelease from "@/views/Goods/Release";
import GoodsEdit from "@/views/Goods/Edit";
//权限
import AuthRole from "@/views/Auth/Role";
import AuthMenu from "@/views/Auth/Menu";
import RoleConfig from "@/views/Auth/Role-Config";

/**
 * 2. 定义路由
 * 每个路由应该映射一个组件。
 * 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，
 * 或者，只是一个组件配置对象。
 */
const routes = [
    {
        path: '/register',
        name: 'UserRegister',
        component: UserRegister,
    },
    {
        path: '/login/',
        name: 'UserLogin',
        component: UserLogin,
        props: (route) => route.query,
        alias: "/",
    },
    {
        path: '/goods',
        name: 'Goods',
        component: Index,
        redirect: '/goods/list',
        meta: {
            requiredAuth: true
        },
        children: [
            {
                path: 'category',
                name: 'GoodsCategory',
                component: GoodsCategory,
                meta: {
                    requiredAuth: true
                },
            },
            {
                path: "list",
                name: "GoodsList",
                component: GoodsList,
                meta: {
                    requiredAuth: true
                },
            },
            {
                path: "release",
                name: "GoodsRelease",
                component: GoodsRelease,
                meta: {
                    requiredAuth: true
                },
            },
            {
                path: "edit/:id",
                name: "GoodsEdit",
                component: GoodsEdit,
                props: true,
                meta: {
                    requiredAuth: true
                },
            }]
    },
    {
        path: '/user',
        name: 'User',
        component: Index,
        meta: {
            requiredAuth: true
        },
        children: [
            {
                path: "list",
                name: "UserList",
                component: UserList,
                meta: {
                    requiredAuth: true
                },
            }, {
                path: "info",
                name: "UserInfo",
                component: UserInfo,
                meta: {
                    requiredAuth: true
                },
            },
        ]
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Index,
        meta: {
            requiredAuth: true
        },
        children: [
            {
                path: "menu",
                name: "AuthMenu",
                component: AuthMenu,
                meta: {
                    requiredAuth: true
                },
            },
            {
                path: "role",
                name: "AuthRole",
                component: AuthRole,
                meta: {
                    requiredAuth: true
                },
                children: [{
                    path: "config/:id",
                    name: "RoleConfig",
                    component: RoleConfig,
                    props: true,
                    meta: {
                        requiredAuth: true
                    },
                }]
            }]
    },
    {
        path: '/order',
        name: 'Index',
        component: Index,
        meta: {
            requiredAuth: true
        },
        children: [{
            path: "list",
            name: "OrderList",
            component: OrderList,
            meta: {
                requiredAuth: true
            },
        }]
    }
];

// 3. 创建 router 实例，然后传 `routes` 配置。
const router = new Router({
    routes // (缩写) 相当于 routes: routes
})
// 4.全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiredAuth)) {
        // 无token,未登录
        if (!sessionStorage.token) {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            });
            return;
        }
        // 已登录
        next();
    } else {
        next();
    }
});

export default router