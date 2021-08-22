const treeMenu = (state, getters) => {
	// 添加根基分类
	return [{
		component: null,
		icon: "",
		icon_id: "",
		id: 1,
		menu_order: "0",
		name: "全部分类",
		pId: 0,
		path: "",
		children: getters.sideMenu
	}];
};
const sideMenu = (state) => {
	let cate_1st = state.menus.filter((item) => item.pId === 1);
	//转换为树形结构
	const parseToTree = function(list) {
		return list.map((parent) => {
			let children = state.menus.filter((child) => child.pId === parent.id);
			if (children.length) {
				return { ...parent, children: parseToTree(children) }
			} else {
				return { ...parent }
			}
		});
	}
	//深拷贝，防止修改原始数组
	return parseToTree(cate_1st);
}

export default {
	treeMenu,
	sideMenu,
}
