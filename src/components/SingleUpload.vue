<template>
	<el-upload class="avatar-uploader" :action="action" :headers="headers" :show-file-list="false" :on-success="uploadSuccess"
	 :on-error="uploadError" :before-upload="beforeUpload">
		<div v-if="url" @click.stop="removeImage" class="cover">
			<i class="el-icon-delete avatar-uploader-icon"></i>
		</div>
		<img v-if="url" :src="url" class="avatar">
		<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	</el-upload>
</template>

<script>
	// 支持双向数据绑定，采用:url.sync
	// 支持$emit事件success,处理复杂上传成功回调函数
	import { Upload } from '@/api/index';

	export default {
		name: "SingleUpload",
		props: {
			url: {
				type: String,
			},
			defaultImage: {
				type: String,
			},
			action: {
				type: String,
				required: true
			},
		},
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
			}
		},
		methods: {
			// 上传图片之前的检查
			beforeUpload(file) {
				let reg = /^image\/(jpe?g|png)$/;
				const isImg = reg.test(file.type);
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isImg) {
					this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isImg && isLt2M;
			},
			// 上传图片成功
			uploadSuccess(res, file) {
				// 触发外部绑定的事件
				this.$emit('success', res);
				// 双向数据绑定触发
				this.$emit('update:url', res.src);
			},
			// 上传图片失败
			uploadError({ status, message }, file, fileList) {
				switch (status) {
					case 401:
						this.$message.error(`错误:401,Token失效,请重新登录!`);
						break;
					case 400:
						message = JSON.parse(message);
						this.$message.error(`错误:400,${message.msg}`);
						break;
					default:
						this.$message.error(`错误:${status},${message}!`);
						break;
				}
			},
			// 删除现有图片
			async removeImage() {
				// 如果不是默认头像，物理删除图片
				if (this.url != this.defaultImage) {
					let { status } = await Upload.remove({ src: '.' + this.url });
					if (status) {
						this.$message.success('删除成功!');
					}
				}
				// 如果是默认头像，仅移除，不做物理删除
				this.$emit('update:url', '');
			}
		}
	}
</script>

<style lang="scss">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;

		&:hover {
			border-color: #409EFF;
		}

		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}

		.cover {
			content: "";
			display: block;
			font-size: 14px;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			background-color: rgba(0, 0, 0, 0.7);
			opacity: 0;
			transition: all 0.5s;

			.el-icon-delete {
				color: white;
			}
		}

		&:hover .cover {
			opacity: 1;
		}

		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
	}
</style>
