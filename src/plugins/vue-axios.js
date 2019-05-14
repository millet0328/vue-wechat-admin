import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	// 排除登录、注册两个api
	if (config.url == '/api/user/login' || config.url == '/api/user/register') {
		return config;
	}
	if (sessionStorage.token) {
		config.headers.Authorization = `Bearer ${sessionStorage.token}`;
	} else {
		alert("token未获取，请登录！");
	}
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	//在这里你可以判断后台返回数据携带的请求码
	if (response.status === 200) {
		return response.data
	} else {
		// 非200请求抱错
		throw Error(response.data.msg || '服务异常')
	}
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});


Vue.use(VueAxios, axios)
