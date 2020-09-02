import axios from 'axios';

// 获取管理员列表
const list = (formData) => axios.get('/api/admin/list', { params: formData });
// 更新管理员账户信息
const update = (formData) => axios.put('/api/admin', formData);
// 删除管理员账户
const remove = (formData) => axios.delete('/api/admin', { params: formData });

export default {
	list,
	update,
	remove
}
