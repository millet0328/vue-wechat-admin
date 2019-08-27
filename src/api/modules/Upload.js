import axios from 'axios';

const deleteImage = (formData) => axios.delete('/api/upload', formData);

export default {
	deleteImage,
}
