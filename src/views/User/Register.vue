<template>
  <div class="bg">
    <el-card shadow="always" class="box-card form-box">
      <div slot="header">
        <span>注册</span>
      </div>
      <el-form ref="form" :rules="rules" size="medium" :model="form" label-width="60px">
        <el-form-item prop="username" label="账户">
          <el-input placeholder="账户名长度在 3 到 15 个字符!" prefix-icon="el-icon-user" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input placeholder="密码至少3位数字!" prefix-icon="el-icon-key" type="password"
                    v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="fullname" label="姓名">
          <el-input placeholder="请填写真实姓名" prefix-icon="el-icon-postcard" v-model="form.fullname"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="tel" label="手机">
          <el-input placeholder="请填写常用手机号码!" prefix-icon="el-icon-mobile-phone" v-model="form.tel"></el-input>
        </el-form-item>
        <el-form-item prop="isAgree">
          <el-checkbox v-model="form.isAgree" label="同意本站用户协议"></el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleRegister" type="primary">注 册</el-button>
        </el-form-item>
      </el-form>
      <div class="link-box">
        <router-link to="/login">登录账户</router-link>
        <router-link to="/">忘记密码？</router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        fullname: '',
        sex: '男',
        tel: '',
        isAgree: [],
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名！', trigger: 'blur' },
          { type: 'string', min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { type: 'string', pattern: /^[0-9]{3,}$/, message: '密码至少3位数字', trigger: 'blur' },
        ],
        fullname: [
          { required: true, message: '请输入真实姓名！', trigger: 'blur' },
          {
            type: 'string',
            pattern: /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/,
            message: '请输入有效的姓名',
            trigger: 'blur'
          }
        ],
        tel: [
          { required: true, message: '请输入手机号码！', trigger: 'blur' },
          { type: 'string', pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入有效的手机号码', trigger: 'blur' }
        ],
        isAgree: [
          { required: true, message: '请同意用户协议', trigger: 'change' },
        ]
      }
    }
  },
  created() {
    document.title = "注册";
  },
  methods: {
    handleRegister() {
      // 1.表单验证
      this.$refs.form.validate(async (valid, obj) => {
        if (valid) {
          // 2.提取数据
          let { msg, data, status } = await User.register({ ...this.form });
          if (!status) {
            this.$message.error(msg);
            return;
          }
          this.$message.success(msg);
          // 储存token,uid,role (1-超级管理员，2-管理员，3-运营管理)
          sessionStorage.token = data.token;
          sessionStorage.role = data.role;
          sessionStorage.id = data.id;
          // 跳转页面
          this.$router.push('/goods');

        }
      });
    },
  }
}
</script>

<style scoped="scoped" lang="less">
.bg {
  width: 100vw;
  height: 100vh;
  background: url(../../assets/img/login/login-bg.jpg);
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

    .link-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
