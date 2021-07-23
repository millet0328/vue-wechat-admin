import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
	isCollapse: false, //菜单折叠
	menus:[],
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
};
