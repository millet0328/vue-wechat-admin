import axios from 'axios';

const add = (formData) => axios.post('/api/category', formData);

const remove = (formData) => axios.delete('/api/category', { params: formData });

const update = (formData) => axios.put('/api/category', formData);

const load = (formData) => axios.get('/api/category/sub', { params: formData });

export default {
	add,
	remove,
	update,
	load,
}
