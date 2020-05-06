import axios from 'axios';

const remove = (formData) => axios.delete('/api/upload', { params: formData });

export default {
	remove,
}
