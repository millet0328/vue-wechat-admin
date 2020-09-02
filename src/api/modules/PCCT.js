import axios from "axios";

// 获取所有省份
const province = (formData) => axios.get('/api/pcct/province', { params: formData });
// 根据省份id获取城市
const city = (formData) => axios.get('/api/pcct/city', { params: formData });
// 根据市区id获取县区
const county = (formData) => axios.get('/api/pcct/county', { params: formData });
// 根据县区id获取街道(镇)
const town = (formData) => axios.get('/api/pcct/town', { params: formData });

export default {
	province,
	city,
	county,
	town,
}