import axios from 'axios';

// 添加分类
const add = (formData) => axios.post('/api/category', formData);
// 删除分类
const remove = (id, params) => axios.delete(`/api/category/${id}`, { params });
// 更新分类
const update = (id, formData) => axios.put(`/api/category/${id}`, formData);
// 获取子级分类
const load = (params) => axios.get('/api/category/sub', { params });

export default {
    add,
    remove,
    update,
    load,
}
