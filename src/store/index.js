import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
// 模块
import UserModule from './modules/User/index';
import MenuModule from './modules/Menu/index';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		User: UserModule,
		Menu: MenuModule
	},
	plugins: [createPersistedState()],
})
