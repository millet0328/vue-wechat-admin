import axios from 'axios';

const load = (formData) => axios.get('/api/role/list', {params: formData});
const add = (formData) => axios.post('/api/role/add', formData);
const remove = (formData) => axios.post('/api/role/delete', formData);
const update = (formData) => axios.post('/api/role/update', formData);

export default {
    load,
    add,
    remove,
    update,
}