import axios from 'axios';

const add = (formData) => axios.post('/api/category/add', formData);

const remove = (formData) => axios.post('/api/category/delete', formData);

const update = (formData) => axios.post('/api/category/update', formData);

const loadList = (formData) => axios.post('/api/admin/order/list', formData);

export default {
	add,
	remove,
	update,
	loadList,
}
