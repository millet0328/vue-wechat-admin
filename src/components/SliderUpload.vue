<template>
  <div>
    <el-upload :file-list="fileList" :action="action" :headers="headers" :limit="6" list-type="picture-card"
               :before-upload="handleBeforeUpload"
               :on-success="handleSliderSuccess" :on-exceed="handleSliderExceed"
               :before-remove="handleSliderBeforeRemove"
               :on-error="handleUploadError" :on-preview="handleCardPreview">
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 图片预览 -->
    <el-dialog width="30%" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt/>
    </el-dialog>
  </div>
</template>

<script>
import {Upload} from '@/api/index';

export default {
  name: "SliderUpload",
  // 组件外部数据
  props: {
    value: {
      type: String,
    },
    action: {
      type: String,
      required: true
    },
    fileList:{
      type: Array,
    }
  },
  // 组件内部数据
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      headers: {
        Authorization: `Bearer ${sessionStorage.token}`
      },
    }
  },
  methods: {
    // 上传图片失败
    handleUploadError({status, message}, file, fileList) {
      let {msg} = JSON.parse(message);
      switch (status) {
        case 401:
          this.$message.error(`错误:401,Token失效,请重新登录!`);
          break;
        case 400:
          this.$message.error(`错误:400,${msg}`);
          break;
        default:
          this.$message.error(`错误:${status},${msg}!`);
          break;
      }
    },
    //上传之前的检查
    handleBeforeUpload(file) {
      const isImg = /^image\/(jpe?g|png)$/.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isImg) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isImg && isLt2M;
    },
    //预览
    handleCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上传文件成功
    handleSliderSuccess(response, file, fileList) {
      if (response.status) {
        let data = this.convertFileList(fileList);
        this.$emit("input", data);
      }
    },
    //超出限制
    handleSliderExceed(files, fileList) {
      this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //删除图片
    async handleSliderBeforeRemove(file, fileList) {
      let src = file.response.src;
      let {status} = await Upload.remove({src});
      if (status) {
        let i = fileList.findIndex(item => item.url == src);
        let copy = [...fileList];
        copy.splice(i, 1);
        let data = this.convertFileList(copy);
        this.$emit("input", data);
        return true;
      } else {
        return false;
      }
    },
    //转换数据格式
    convertFileList(fileList) {
      let res = [];
      fileList.forEach(function (item, index) {
        res.push(item.response.src);
      });
      return res.toString();
    },
  }
}
</script>

<style scoped>

</style>