import axios from "axios";

const loadSub = (formData) => axios.get('/api/menu/sub', {params: formData});
const add = (formData) => axios.post('/api/menu/add', formData);
const update = (formData) => axios.post('/api/menu/update', formData);
const remove = (formData) => axios.post('/api/menu/delete', formData);
const loadTree = (formData) => axios.get('/api/menu/tree', {params: formData});
export default {
    loadSub,
    add,
    update,
    remove,
    loadTree
}