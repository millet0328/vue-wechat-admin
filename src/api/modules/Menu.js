import axios from "axios";

const load = (formData) => axios.get('/api/menu/sub', {params: formData});
const add = (formData) => axios.post('/api/menu/add', formData);
const update = (formData) => axios.post('/api/menu/update', formData);
const remove = (formData) => axios.post('/api/menu/delete', formData);

export default {
    load,
    add,
    update,
    remove,
}