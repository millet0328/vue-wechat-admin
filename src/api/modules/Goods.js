import axios from 'axios';

const release = (formData) => axios.post('/api/goods/release', formData);

const remove = (formData) => axios.post('/api/goods/delete', formData);

const update = (formData) => axios.post('/api/goods/edit', formData);

const list = (formData) => axios.get('/api/admin/goods/list', { params: formData });

const getDetail = (formData) => axios.get('/api/admin/goods/detail', { params: formData });

export default {
	release,
	remove,
	update,
	list,
	getDetail,
}