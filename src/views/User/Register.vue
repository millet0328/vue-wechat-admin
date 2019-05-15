<template>
	<div class="bg">
		<div class="form-box">
			<form action="">
				<div class="title">注册新账户</div>
				<div class="body">
					<div class="form-control">
						<div class="add-on">
							<i class="fa fa-user"></i>
						</div>
						<input type="text" v-model="formData.username" class="input-control" placeholder="请输入账户名">
					</div>
					<div class="form-control">
						<div class="add-on">
							<i class="fa fa-lock"></i>
						</div>
						<input type="password" v-model="formData.password" class="input-control" placeholder="请输入密码">
					</div>
					<div class="form-control">
						<div class="add-on">
							<i class="fa fa-tag"></i>
						</div>
						<input type="text" v-model="formData.nickname" class="input-control" placeholder="请输入昵称">
					</div>
					<div class="form-control">
						<div class="add-on">
							<i class="fa fa-venus-mars"></i>
						</div>
						<div class="sex-box">
							<label for="man">
								<input checked name="sex" v-model="formData.sex" value="男" id="man" type="radio">
								<i class="fa fa-mars"></i>
								男
							</label>
							<label for="woman">
								<input id="woman" name="sex" v-model="formData.sex" value="女" type="radio">
								<i class="fa fa-venus"></i>
								女
							</label>
						</div>
					</div>
					<div class="form-control">
						<div class="add-on">
							<i class="fa fa-mobile"></i>
						</div>
						<input type="number" v-model="formData.tel" class="input-control" placeholder="请输入手机号码">
					</div>
					<div class="form-control">
						<button class="btn" @click="regHandle" type="button">注 册</button>
					</div>
					<div class="link-box">
						<router-link to="/login">密码登录</router-link>
						<router-link to="/register">忘记密码？</router-link>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: '',
					nickname: '',
					sex: '',
					tel: '',
				}
			}
		},
		methods: {
			regHandle() {
				// 1.表单验证
				// 2.提取数据
				this.$http
					.post('/api/user/register', {
						...this.formData
					}).then((res) => {
						if (!res.status) {
							this.$message.error(res.msg);
							return false;
						}
						// 储存token,uid
						sessionStorage.token = res.data.token;
						sessionStorage.uid = res.data.id;
						// 跳转页面
						this.$message({
							message: res.msg,
							type: 'success',
							duration: 1000,
							onClose: () => {
								this.$router.push('/index')
							}
						});
					});
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.bg {
		width: 100vw;
		height: 100vh;
		background: url(../../assets/img/reg/login-bg.jpg);
		background-size: cover;
		position: relative;

		.form-box {
			position: absolute;
			right: 100px;
			top: 50%;
			transform: translateY(-50%);
			background-color: white;
			border-radius: 4px;
			font-size: 14px;
			width: 360px;

			.title {
				font-size: 16px;
				font-weight: bold;
				color: #666;
				padding: 15px 20px;
				border-bottom: 1px solid #eee;
			}

			.body {
				padding: 30px 20px;
				padding-top: 0;
			}

			.form-control {
				padding-top: 30px;
				display: flex;
				align-items: center;

				.add-on {
					height: 32px;
					width: 32px;
					border: 1px solid #eee;
					border-right: 0;
					text-align: center;
					background-color: #f8f8f9;
					color: #515a6e;
					border-top-left-radius: 3px;
					border-bottom-left-radius: 3px;

					i.fa {
						line-height: 32px;
					}

					.fa-mobile {
						font-size: 20px;
					}
				}

				.input-control,
				.sex-box {
					flex: 1;
					padding: 4px 7px;
					height: 24px;
					border: 1px solid #eee;
					border-top-right-radius: 3px;
					border-bottom-right-radius: 3px;
				}

				.sex-box {
					display: flex;
					align-items: center;

					label {
						display: flex;
						align-items: center;
						margin-right: 30px;

						i {
							margin: 0 8px;
						}
					}
				}

				.btn {
					flex: 1;
					color: #fff;
					background-color: #2d8cf0;
					border: 1px solid #2d8cf0;
					padding: 8px 15px;
					font-size: 12px;
					border-radius: 4px;
					outline: 0;
				}
			}

			.link-box {
				padding-top: 20px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 12px;
			}

		}
	}
</style>
