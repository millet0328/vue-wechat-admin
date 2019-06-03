import axios from 'axios';

const loadList = (formData) => axios.post('/api/admin/order/list', formData);

export default {
	loadList,
}
