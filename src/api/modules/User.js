import axios from 'axios';
// 登录
const login = (formData) => axios.post('/api/admin/login', formData);
// 注册
const register = (formData) => axios.post('/api/admin/register', formData);
// 获取账户详情
const info = (formData) => axios.get('/api/admin', { params: formData });
// 修改本账户信息
const update = (formData) => axios.put('/api/admin/account', formData);

export default {
	login,
	register,
	info,
	update,
}
