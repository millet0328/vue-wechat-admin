<template>
	<div class="upload-box text-center" :class="{'uploaded':src}">
		<div class="plus">
			<i class="el-icon-plus"></i>
			<input class="file" ref="file" @change="handleUpload" type="file" />
		</div>
		<img :src="src" alt />
		<div class="cover">
			<i class="el-icon-delete" @click="handleRemove"></i>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "upload",
		// 组件外部数据
		props: [
			"uploadAction",
			"removeAction",
			"src",
			"lgImg"
		],
		// 组件内部数据
		methods: {
			// 删除图片
			async handleRemove() {
				let src = this.src.replace(/.+\/images/, "./images");
				let lgImg = this.lgImg.replace(/.+\/images/, "./images");
				// 删除图片
				let { status: statusMd } = await axios.delete(this.removeAction, { params: { src } });
				let { status: statusLg } = await axios.delete(this.removeAction, { params: { src: lgImg } });
				if (statusMd && statusLg) {
					this.$emit("update:src", "");
				}
			},
			// 上传文件
			async handleUpload(e) {
				// 获取file对象
				let file = e.target.files[0];
				// 生成formData
				var formData = new FormData();
				formData.append("file", file);
				// 上传图片
				let { status, mdImg, lgImg } = await axios.post(this.uploadAction, formData);
				if (status) {
					// 上传成功
					this.$emit("update:src", mdImg);
					this.$emit("update:lgImg", lgImg);
					// 清空file表单value
					this.$refs.file.value = "";
				}
			}
		}
	};
</script>

<style scoped lang="less">
	/* upload组件 */
	.text-center {
		text-align: center;
	}

	.upload-box {
		width: 150px;
		height: 150px;
		line-height: 150px;
		border: 1px dashed #ddd;
		border-radius: 4px;
		overflow: hidden;
		position: relative;
	}

	.upload-box .el-icon-plus {
		font-size: 24px;
	}

	.upload-box .file {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		opacity: 0;
		cursor: pointer;
	}

	.upload-box .cover {
		content: "";
		display: block;
		font-size: 14px;
		color: white;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		background-color: rgba(0, 0, 0, 0.7);
		display: none;
	}

	.uploaded:hover .cover {
		display: block;
	}

	.upload-box img {
		width: 100%;
	}

	.uploaded .plus {
		display: none;
	}
</style>
