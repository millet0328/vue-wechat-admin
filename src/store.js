import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

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
			return new Promise((resolve, reject) => {
				axios
					.post('/api/user/login', formData)
					.then((res) => {
						if (!res.status) {
							reject(res);
							return;
						}
						// 储存到state
						commit('saveUserInfo', res.data);
						resolve(res);
					})
			});
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
