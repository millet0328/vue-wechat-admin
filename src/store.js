import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { Message } from 'element-ui';
import router from './router';

Vue.use(Vuex);
// 用户模块
let UserModule = {
	state: {
		uid: '',
		role: '',
		token: '',
	},
	mutations: {
		saveUserInfo(state, user) {
			state.uid = user.id;
			state.token = user.token;
			state.role = user.role;
		}
	},
	actions: {
		Login({ commit, state }, formData) {
			axios
				.post('/api/user/login', formData)
				.then((res) => {
					if (!res.status) {
						Message.error(res.msg);
						return;
					}
					// 储存token,uid,role (1-超级管理员，2-管理员，3-运营管理)
					sessionStorage.token = res.data.token;
					sessionStorage.uid = res.data.id;
					sessionStorage.role = res.data.role;
					// 储存到state
					commit('saveUserInfo', res.data);
					Message({
						message: res.msg,
						type: 'success',
						duration: 1000,
						onClose: () => {
							if (this.redirect) {
								router.push(this.redirect);
								return;
							}
							router.push('/index')
						}
					});
				})
		},
	}
}
// 菜单模块
let MenuModule = {
	state: {
		isCollapse: false, //菜单折叠
	},
	mutations: {
		collapseMenu(state) {
			state.isCollapse = !state.isCollapse;
		},
	},
	actions: {

	}
}
export default new Vuex.Store({
	modules: {
		user: UserModule,
		menu: MenuModule
	}
})
