import axios from 'axios';
//发布商品
const release = (formData) => axios.post('/api/admin/goods', formData);
//删除商品
const remove = (id, params) => axios.delete(`/api/admin/goods/${id}`, { params });
//编辑商品
const update = (id, formData) => axios.put(`/api/admin/goods/${id}`, formData);
//商品列表
const list = (params) => axios.get('/api/admin/goods/list', { params });
//商品详情
const detail = (params) => axios.get('/api/admin/goods', { params });

export default {
    release,
    remove,
    update,
    list,
    detail,
}