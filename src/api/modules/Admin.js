import axios from 'axios';

// 获取管理员列表
const list = (params) => axios.get('/api/admin/list', { params });
// 更新管理员个人资料
const update = (formData) => axios.put('/api/admin/', formData);
// 删除管理员账户
const remove = (id, params) => axios.delete(`/api/admin/${id}`, { params });

export default {
    list,
    update,
    remove
}
