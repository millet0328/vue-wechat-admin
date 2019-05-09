<template>
	<div id="app">
		<h1>Hello App!</h1>
		<p>
			<!-- 使用 router-link 组件来导航. -->
			<!-- 通过传入 `to` 属性指定链接. -->
			<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
			<router-link to="/foo">Go to Foo</router-link>
			<router-link to="/bar">Go to Bar</router-link>
		</p>
		<!-- 路由出口 -->
		<!-- 路由匹配到的组件将渲染在这里 -->
		<router-view></router-view>
	</div>
</template>

<script>
	import Register from '@/views/Register.vue';
	import Login from '@/views/Login.vue';
	import Home from '@/views/Home.vue';
	export default {
		components: {
			Register,
			Login,
			Home
		},
	}
</script>

<style lang="scss">
	// css公共类
	$blue:#2d8cf0;
	$fz14:14px;
	$fz12:12px;
	@import './assets/lib/font-awesome-4.7.0/css/font-awesome.min.css';

	html,
	body {
		margin: 0;
	}

	a {
		text-decoration: none;
		color: #666;
	}
</style>
