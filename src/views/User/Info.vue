<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="100px">
        <el-form-item label="账户" prop="username">
          <el-input v-model="form.username" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="fullname">
          <el-input v-model="form.fullname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model.number="form.tel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <single-upload default-image="http://localhost:3003/images/avatar/default.jpg" :data="{type:'avatar'}"
                         action="/api/upload/common/" :url.sync="form.avatar"/>
        </el-form-item>
        <el-button type="primary" @click="updateInfo">修 改</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import SingleUpload from '@/components/SingleUpload.vue';

export default {
  components: {
    SingleUpload,
  },
  data() {
    return {
      roles: [],
      form: {
        username: "",
        fullname: "",
        sex: "男",
        tel: "",
        role: "",
        avatar: "",
      },
      rules: {
        fullname: [
          { required: true, type: 'string', message: '请输入真实姓名！', trigger: 'blur' },
          { pattern: /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/, message: '请输入有效的姓名', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别！', trigger: 'blur' },
        ],
        tel: [
          { required: true, message: '请输入手机号码！', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请上传一张头像！', trigger: 'click' },
        ],
      }
    };
  },
  created() {
    // 双向数据绑定，vuex中的state不适合用计算属性
    this.form = { ...this.$store.state.User.profile };
    document.title = "账户信息";
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用，可以访问组件实例 `this`
    this.$refs.form.validateField("avatar", (msg) => {
      if (msg) {
        this.$message.error(msg);
        next(false);
      } else {
        next();
      }
    });
  },
  methods: {
    // 修改账户信息
    updateInfo() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return false
        }
        ;
        let { role } = this.form;
        this.$store.dispatch('User/Update', { ...this.form }).then(({ status, msg }) => {
          if (status) {
            sessionStorage.role = role;
            this.$message.success(msg);
          }
        })
      });
    },
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 70%;
  margin: 0 auto;
}
</style>
