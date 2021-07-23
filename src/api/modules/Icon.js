import axios from "axios";

const list = (params) => axios.get('/api/admin/icon/list', { params });

export default {
    list,
}
