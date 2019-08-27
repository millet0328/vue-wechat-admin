import axios from 'axios';

const login = (formData) => axios.post('/api/admin/login', formData);

const register = (formData) => axios.post('/api/admin/register', formData);

const loadInfo = (formData) => axios.get('/api/admin', { params: formData });

const list = (formData) => axios.get('/api/admin/list', { params: formData });

const update = (formData) => axios.put('/api/admin', formData);

const remove = (formData) => axios.delete('/api/admin', { params: formData });

export default {
	login,
	register,
	loadInfo,
	list,
	update,
	remove
}
