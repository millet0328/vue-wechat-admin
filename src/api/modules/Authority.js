import axios from 'axios';

const login = (formData) => axios.post('/api/admin/login', formData);

const loadRole = (formData) => axios.get('/api/role/list', { params: formData });

export default {
	login,
	loadRole,
}