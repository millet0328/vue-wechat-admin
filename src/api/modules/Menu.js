import axios from "axios";
// 加载下一级菜单
const loadSub = (params) => axios.get('/api/menu/sub', { params });
// 添加菜单
const add = (formData) => axios.post('/api/menu', formData);
// 更新菜单
const update = (id, formData) => axios.put(`/api/menu/${id}`, formData);
// 删除菜单
const remove = (id, params) => axios.delete(`/api/menu/${id}`, { params });
// 获取侧边栏菜单
const loadTree = (params) => axios.get('/api/menu/tree', { params });
// 设置菜单icon
const setIcon = (id, formData) => axios.put(`/api/menu/icon/${id}`, formData);

export default {
    loadSub,
    add,
    update,
    remove,
    loadTree,
    setIcon,
}
