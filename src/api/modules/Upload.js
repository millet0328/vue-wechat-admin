import axios from 'axios';

const removeImage = (formData) => axios.post('/api/upload/delete', formData);

export default {
	removeImage,
}
