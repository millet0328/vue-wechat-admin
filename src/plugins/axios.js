import Vue from 'vue';
import axios from 'axios';

import { Loading, Message } from 'element-ui';

// 路由实例
import router from '@/router.js';

let loading;
// 设置baseURL，自动将api地址前面拼接，${baseURL}/api/path
axios.defaults.baseURL = 'http://localhost:3000/';
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	loading = Loading.service({ background: 'rgba(0, 0, 0, 0.8)' });
	// 排除登录、注册两个api,忽略token校验
	if (config.url == '/api/admin/login' || config.url == '/api/admin/register') {
		return config;
	}
	if (!sessionStorage.token) {
		Message.error({
			message: 'token失效，请重新登录系统！',
			onClose: () => {
				router.replace('/login');
				loading.close();
			}
		});
	}
	config.headers.Authorization = `Bearer ${sessionStorage.token}`;
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function({ status, data, response }) {
	//在这里你可以判断后台返回数据携带的请求码
	loading.close();
	switch (status) {
		case 200:
			return data;
			break;
		default:
			Message.error(response.statusText);
			break;
	}
}, function(error) {
	// 拦截401状态码
	if (error.response.status == 401) {
		let expiredTime = new Date(error.response.data.inner.expiredAt).toLocaleString();
		Message.error({
			message: `Token已过期,有效期至${expiredTime}，请重新登录！`,
			onClose: () => {
				router.replace('/login');
				loading.close();
			}
		});
	}
	// 对响应错误做点什么
	return Promise.reject(error);
});
