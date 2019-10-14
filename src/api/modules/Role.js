import axios from 'axios';

const list = (formData) => axios.get('/api/role/list', {params: formData});
const add = (formData) => axios.post('/api/role', formData);
const remove = (formData) => axios.delete('/api/role', {params: formData});
const update = (formData) => axios.put('/api/role', formData);
const loadConfig = (formData) => axios.get('/api/role/config', {params: formData});
const createMenu = (formData) => axios.post('/api/role/menu', formData);
const removeMenu = (formData) => axios.delete('/api/role/menu', {params: formData});
export default {
    list,
    add,
    remove,
    update,
    loadConfig,
    createMenu,
    removeMenu,
}