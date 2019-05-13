<template>
	<div class="bg">
		<div class="form-box">
			<form action="">
				<div class="title">欢迎登陆</div>
				<div class="body">
					<div class="form-control" :class="{error:!valid[0]}">
						<div class="add-on">
							<i class="fa fa-user"></i>
						</div>
						<input type="text" class="input-control" @blur="checkUsername" v-model="formData.username" placeholder="请输入账户名">
					</div>
					<div class="form-control" :class="{error:!valid[1]}">
						<div class="add-on">
							<i class="fa fa-lock"></i>
						</div>
						<input type="password" pattern="[1-9]\d{6,}" @blur="checkPassword" class="input-control" v-model="formData.password"
						 placeholder="请输入密码">
					</div>
					<div class="form-control">
						<button class="btn" @click="regHandle" type="button">登 录</button>
					</div>
					<div class="link-box">
						<router-link to="/register">注册账户</router-link>
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
					username: "",
					password: "",
				},
				valid: [true, true],
			}
		},
		methods: {
			checkUsername() {
				let usernameReg = /[A-Za-z0-9_-]{6,}/; //至少6位字母或者数字
				let flag = usernameReg.test(this.formData.username);
				this.$set(this.valid, 0, flag);
				return flag;
			},
			checkPassword() {
				let passwordReg = /\d{6,}/; //至少6位数字
				let flag = passwordReg.test(this.formData.password);
				this.$set(this.valid, 1, flag);
				return flag;
			},
			regHandle() {
				// 表单验证
				let isValid = this.checkUsername() && this.checkPassword();
				// 验证通过
				if (isValid) {
					this.$http
						.post('/api/user/login', {
							...this.formData
						})
						.then((res) => {
							if (res.data.status) {
								// 储存token,uid
								sessionStorage.token = res.data.data.token;
								sessionStorage.uid = res.data.data.id;
								// 跳转页面
								this.$message({
									message: res.data.msg,
									onClose: () => {
										this.$router.push('/index')
									}
								});
							} else {
								this.$message(res.data.msg);
							}
						});
				}
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

			.error {

				.input-control,
				.sex-box {
					border-color: red;
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
