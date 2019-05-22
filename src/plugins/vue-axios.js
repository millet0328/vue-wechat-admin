import Vue from 'vue';
import axios from 'axios';
import { Loading, Message } from 'element-ui';
import VueAxios from 'vue-axios';
let loading;
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	// 排除登录、注册两个api
	loading = Loading.service({ background: 'rgba(0, 0, 0, 0.8)' });
	if (config.url == '/api/admin/login' || config.url == '/api/admin/register') {
		return config;
	}
	if (sessionStorage.token) {
		config.headers.Authorization = `Bearer ${sessionStorage.token}`;
	} else {
		Message.error("token未获取，请登录！");
	}
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	//在这里你可以判断后台返回数据携带的请求码
	setTimeout(() => {
		loading.close();
	}, 500);
	switch (response.status) {
		case 200:
			return response.data;
			break;
		default:
			Message.error(response.response.statusText);
			break;
	}
}, function(error) {
	// 拦截401状态码
	if (error.response.status == 401) {
		Message.error("Token无效，请重新登录！");
	}
	// 对响应错误做点什么
	return Promise.reject(error);
});


Vue.use(VueAxios, axios)
