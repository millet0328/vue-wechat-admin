import axios from 'axios';

const loadList = (params) => axios.get('/api/admin/order/list', { params });

export default {
    loadList,
}
