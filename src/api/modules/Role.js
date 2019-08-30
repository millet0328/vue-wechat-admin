import axios from 'axios';

const load = (formData) => axios.get('/api/role/list', {params: formData});
const add = (formData) => axios.post('/api/role', formData);
const remove = (formData) => axios.delete('/api/role', {params: formData});
const update = (formData) => axios.put('/api/role', formData);
const loadConfig = (formData) => axios.get('/api/role/config', {params: formData});
const putMenu = (formData) => axios.put('/api/role/menu', formData);
const deleteMenu = (formData) => axios.delete('/api/role/menu', {params: formData});
export default {
    load,
    add,
    remove,
    update,
    loadConfig,
    putMenu,
    deleteMenu,
}