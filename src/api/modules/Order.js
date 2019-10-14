import axios from 'axios';

const loadList = (formData) => axios.get('/api/admin/order/list', { params: formData });

export default {
	loadList,
}
