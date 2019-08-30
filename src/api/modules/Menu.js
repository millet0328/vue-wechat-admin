import axios from "axios";

const loadSub = (formData) => axios.get('/api/menu/sub', {params: formData});
const add = (formData) => axios.post('/api/menu', formData);
const update = (formData) => axios.put('/api/menu', formData);
const remove = (formData) => axios.delete('/api/menu', {params: formData});
const loadTree = (formData) => axios.get('/api/menu/tree', {params: formData});
export default {
    loadSub,
    add,
    update,
    remove,
    loadTree
}