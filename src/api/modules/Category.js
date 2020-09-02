import axios from 'axios';

// 添加分类
const add = (formData) => axios.post('/api/category', formData);
// 删除分类
const remove = (formData) => axios.delete('/api/category', { params: formData });
// 更新分类
const update = (formData) => axios.put('/api/category', formData);
// 获取子级分类
const load = (formData) => axios.get('/api/category/sub', { params: formData });

export default {
	add,
	remove,
	update,
	load,
}
