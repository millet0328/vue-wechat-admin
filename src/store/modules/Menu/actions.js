import { Menu } from '@/api/index';
const LoadTree = async ({ commit, state }, formData) => {
	let { status, data } = await Menu.loadTree(formData);
	if (status) {
		// 储存到state
		commit('StoreTree', data);
	}
	return data;
};
export default {
	LoadTree
}
