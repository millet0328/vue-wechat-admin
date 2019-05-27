import axios from 'axios';

const login = (formData) => axios.post('/api/admin/login', formData);

const register = (formData) => axios.post('/api/admin/register', formData);

const getUserInfo = (formData) => axios.get('/api/admin/info', { params: formData });

const list = (formData) => axios.get('/api/admin/list', { params: formData });

const updateUserInfo = (formData) => axios.post('/api/admin/info/update', formData);

export default {
	login,
	register,
	getUserInfo,
	list,
	updateUserInfo
}
