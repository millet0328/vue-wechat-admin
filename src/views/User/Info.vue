<template>
    <div>
        <Title text="账户信息"></Title>
        <el-form :model="form" label-position="left">
            <el-form-item label="账户" label-width="100px">
                <el-input v-model="form.username" disabled auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" label-width="100px">
                <el-input v-model="form.nickname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" label-width="100px">
                <el-radio-group v-model="form.sex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机" label-width="100px">
                <el-input v-model.number="form.tel" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="权限" label-width="100px">
                <el-select v-model="form.role" placeholder="请选择账户">
                    <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="头像" label-width="100px">
                <el-upload class="avatar-uploader" action="/api/upload/avatar/" :headers="headers"
                           :show-file-list="false"
                           :on-success="editUploadSuccess" :before-upload="beforeUpload">
                    <div class="el-upload">
                        <img v-if="form.avatar" :src="form.avatar" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </div>
                </el-upload>
            </el-form-item>
            <el-button type="primary" @click="updateInfo">修 改</el-button>
        </el-form>
    </div>

</template>

<script>
    //引入service模块
    import {User, Role} from '@/api/index';
    import Title from '@/components/Title.vue';

    export default {
        components: {
            Title
        },
        data() {
            return {
                headers: {
                    Authorization: `Bearer ${sessionStorage.token}`
                },
                roles: [],
                form: {}
            };
        },
        created() {
            this.loadRole();
            // 双向数据绑定，vuex中的state不适合用计算属性
            this.form = {...this.$store.state.User.userInfo};
        },
        methods: {
            async loadRole() {
                let {status, data} = await Role.load();
                if (status) {
                    this.roles = data;
                }
            },
            // 修改账户信息
            updateInfo() {
                let {role} = this.form;
                this.$store.dispatch('User/Update', {...this.form}).then((res) => {
                    if (res.status) {
                        sessionStorage.role = role;
                        this.$message.success(res.msg);
                    }
                })
            },
            // 上传图片之前的检查
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 编辑Modal上传成功
            editUploadSuccess(res, file) {
                this.form.avatar = res.src;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .el-form {
        width: 70%;
        margin: 0 auto;
    }

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

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
</style>
