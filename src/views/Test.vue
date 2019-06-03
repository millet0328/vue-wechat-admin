<template>
	<div>
		<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
		 :on-success="handleAvatarSuccess" :on-preview="handlePictureCardPreview" :before-upload="beforeAvatarUpload">
			<i class="el-icon-plus"></i>
		</el-upload>
		<el-dialog width="20%" :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: '',
				dialogImageUrl: '',
				dialogVisible: false
			};
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		}
	}
</script>

<style>

</style>
