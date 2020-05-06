import axios from "axios";

const list = (formData) => axios.get('/api/admin/icon/list', { params: formData });

export default {
	list,
}
