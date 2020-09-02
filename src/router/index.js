// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(Router)
import Vue from 'vue'
import Router from 'vue-router'
import { Menu } from "@/api/index";

Vue.use(Router)
// 1. import 进来views文件夹下的页面级组件。
// layout
import Layout from '@/components/Layout.vue';
// 用户组
import UserLogin from '@/views/User/Login.vue';
import UserRegister from '@/views/User/Register.vue';
import UserList from '@/views/User/List.vue';
import UserInfo from '@/views/User/Info.vue';
// 订单
import OrderList from '@/views/Order/List.vue';
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
const routes = [{
		path: '/register',
		name: 'UserRegister',
		component: UserRegister,
	},
	{
		path: '/login',
		name: 'UserLogin',
		component: UserLogin,
		props: (route) => route.query,
		alias: "/",
	},
	{
		path: '/goods',
		name: 'Goods',
		component: Layout,
		redirect: '/goods/list',
		meta: { requiredAuth: true },
		children: [{
				path: 'category',
				name: 'GoodsCategory',
				component: GoodsCategory,
			},
			{
				path: "list",
				name: "GoodsList",
				component: GoodsList,
			},
			{
				path: "release",
				name: "GoodsRelease",
				component: GoodsRelease,
			},
			{
				path: "edit/:id",
				name: "GoodsEdit",
				component: GoodsEdit,
				props: true,
			}
		]
	},
	{
		path: '/user',
		name: 'User',
		component: Layout,
		meta: { requiredAuth: true },
		children: [{
			path: "list",
			name: "UserList",
			component: UserList,
		}, {
			path: "info",
			name: "UserInfo",
			component: UserInfo,
		}, ]
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Layout,
		meta: { requiredAuth: true },
		children: [{
				path: "menu",
				name: "AuthMenu",
				component: AuthMenu,
			},
			{
				path: "role",
				name: "AuthRole",
				component: AuthRole,
				children: [{
					path: "config/:id",
					name: "RoleConfig",
					component: RoleConfig,
					props: true,
				}]
			}
		]
	},
	{
		path: '/order',
		name: 'Order',
		component: Layout,
		meta: { requiredAuth: true },
		children: [{
			path: "list",
			name: "OrderList",
			component: OrderList,
		}]
	}
];

// 3. 创建 router 实例，然后传 `routes` 配置。
const router = new Router({
	routes // (缩写) 相当于 routes: routes
})
// 4.全局路由守卫
router.beforeEach(async (to, from, next) => {
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
		// 已登录，放行，
		next();
	} else {
		next();
	}
});

export default router
