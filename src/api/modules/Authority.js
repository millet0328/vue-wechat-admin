import axios from 'axios';

const loadRole = (formData) => axios.get('/api/role/list', { params: formData });

export default {
	loadRole,
}