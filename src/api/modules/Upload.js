import axios from 'axios';

const deleteImage = (formData) => axios.post('/api/upload/delete', formData);

export default {
	deleteImage,
}
