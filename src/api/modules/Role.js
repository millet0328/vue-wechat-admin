import axios from 'axios';

const load = (formData) => axios.get('/api/role/list', {params: formData});

export default {
    load,
}