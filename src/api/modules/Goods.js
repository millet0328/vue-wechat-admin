import axios from 'axios';

const release = (formData) => axios.post('/api/admin/goods', formData);

const remove = (formData) => axios.delete('/api/admin/goods', { params: formData });

const update = (formData) => axios.put('/api/admin/goods', formData);

const list = (formData) => axios.get('/api/admin/goods/list', { params: formData });

const getDetail = (formData) => axios.get('/api/admin/goods', { params: formData });

export default {
	release,
	remove,
	update,
	list,
	getDetail,
}