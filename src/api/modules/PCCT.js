import axios from "axios";

// 获取所有省份
const province = (params) => axios.get('/api/pcct/province', { params });
// 根据省份id获取城市
const city = (params) => axios.get('/api/pcct/city', { params });
// 根据市区id获取县区
const county = (params) => axios.get('/api/pcct/county', { params });
// 根据县区id获取街道(镇)
const town = (params) => axios.get('/api/pcct/town', { params });

export default {
    province,
    city,
    county,
    town,
}