import axios from "axios";
// 加载下一级菜单
const loadSub = (formData) => axios.get('/api/menu/sub', { params: formData });
// 添加菜单
const add = (formData) => axios.post('/api/menu', formData);
// 更新菜单
const update = (formData) => axios.put('/api/menu', formData);
// 删除菜单
const remove = (formData) => axios.delete('/api/menu', { params: formData });
// 获取侧边栏菜单
const loadTree = (formData) => axios.get('/api/menu/tree', { params: formData });
// 设置菜单icon
const setIcon = (formData) => axios.put('/api/menu/icon', formData);

export default {
	loadSub,
	add,
	update,
	remove,
	loadTree,
	setIcon,
}
