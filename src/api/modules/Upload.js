import axios from 'axios';

const remove = (params) => axios.delete('/api/upload', { params });

export default {
    remove,
}
