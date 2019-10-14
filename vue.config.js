module.exports = {
    devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:3000',
				ws: true, //开启websocket代理
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
				pathRewrite: {
					'^/api ': '/api'
				}
			},
			'/images': {
				target: 'http://127.0.0.1:3000',
				ws: true, //开启websocket代理
				changeOrigin: true, //虚拟服务器收发请求，解决跨域
				pathRewrite: {
					'^/images ': '/images'
				}
			},
		}
	},
    publicPath: '/admin/'
}
