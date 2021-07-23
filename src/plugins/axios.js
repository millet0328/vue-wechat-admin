import axios from 'axios';

import { Loading, Notification } from 'element-ui';

// 路由实例
import router from '@/router';

let loading;
// 应对跨域请求，设置baseURL，自动将api地址前面拼接，${baseURL}/api/path
// axios.defaults.baseURL = 'http://localhost:3003/';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
	// 在发送请求之前做些什么
	loading = Loading.service({ background: 'rgba(0, 0, 0, 0.8)' });
	// 排除登录、注册两个api,忽略token校验
	if (config.url == '/api/admin/login' || config.url == '/api/admin/register') {
		return config;
	}
	// 获取token，判断是否已经登录
	let { token } = sessionStorage;
	// 拥有token,在headers头添加token
	config.headers.Authorization = `Bearer ${token}`;
	return config;
}, function (error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function ({ status, data, response }) {
	//在这里你可以判断后台返回数据携带的请求码
	loading.close();
	switch (status) {
		case 200:
			return data;
			break;
		default:
			Notification.error({
				title: `错误：${status}`,
				message: '请查看network信息',
			});
			break;
	}
}, function ({ response: { status, data, statusText } }) {
	switch (status) {
		case 401:
			// 提示用户
			let expiredTime = new Date(data.inner.expiredAt).toLocaleString();
			Notification.error({
				title: `错误：${status}`,
				message: `token已过期，有效期至${expiredTime}，请重新登录！`,
			});
			// 获取当前路由，跳转登录
			let { fullPath } = router.history.current;
			router.replace({ path: '/login', query: { redirect: fullPath } });
			break;
		case 404:
			Notification.error({
				title: `错误：${status}`,
				message: 'api接口地址错误，请重新检查！',
			});
			break;
		case 500:
			Notification.error({
				title: `错误：${status}`,
				message: '后台接口错误，请联系后台开发！',
			});
			break;
		default:
			Notification.error({
				title: `错误：${status}`,
				message: statusText,
			});
			break;
	}
});
