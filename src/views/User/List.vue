<template>
    <div>
        <Title text="客户列表"></Title>
        <el-table ref="multipleTable" style="width: 100%" :data="tableData">
            <el-table-column prop="uid" label="#">
            </el-table-column>
            <el-table-column sortable label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="avatar" width="60" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="username" sortable label="账号">
            </el-table-column>
            <el-table-column prop="nickname" sortable label="昵称">
            </el-table-column>
            <el-table-column prop="sex" sortable label="性别" width="120">
            </el-table-column>
            <el-table-column prop="tel" sortable label="手机号码">
            </el-table-column>
            <el-table-column prop="role_name" sortable label="权限">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="showEditModal(scope.row)" plain icon="el-icon-edit" size="small"
                               type="primary"></el-button>
                    <el-button @click="showDeleteModal(scope.row.id)" icon="el-icon-delete" plain size="small"
                               type="danger"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--编辑数据-->
        <el-dialog title="修改信息" :visible.sync="editModalShow">
            <el-form :model="form" label-position="left">
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
                        <el-option v-for="item in roles" :key="item.id" :label="item.role_name"
                                   :value="item.id"></el-option>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editModalShow = false">取 消</el-button>
                <el-button type="primary" @click="updateInfo">确 定</el-button>
            </div>
        </el-dialog>
        <!--确认删除-->
    </div>

</template>

<script>
    //引入service模块
    import {User, Role} from '@/api/index'
    import Title from '@/components/Title.vue';
    export default {
        name: "List",
        components: {
            Title
        },
        data() {
            return {
                tableData: [],
                roles: [],
                headers: {
                    Authorization: `Bearer ${sessionStorage.token}`
                },
                editModalShow: false,
                form: {
                    uid: "",
                    nickname: "",
                    sex: "男",
                    tel: "",
                    role: "",
                    avatar: "",
                },
            };
        },
        created() {
            this.loadList();
            this.loadRole();
        },
        methods: {
            loadList(index) {
                User.list()
                    .then((res) => {
                        if (res.status) {
                            res.data.forEach(function (item) {
                                item.uid = item.id;
                            });
                            this.tableData = res.data;
                        }
                    });
            },
            loadRole() {
                Role.load()
                    .then(res => {
                        if (res.status) {
                            this.roles = res.data;
                        }
                    });
            },
            showEditModal(row) {
                this.editModalShow = true;
                this.form = row;
            },
            showDeleteModal(id) {
                this.$confirm('此操作将永久删除该账户, 是否继续?', {
                    type: 'warning'
                }).then(() => {
                    console.log(id);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 修改账户信息
            updateInfo() {
                User.updateUserInfo({...this.form}).then((res) => {
                    if (res.status) {
                        this.editModalShow = false;
                        this.$message.success(res.msg);
                        this.loadList();
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
    };
</script>

<style scoped>
    .cell .avatar {
        border-radius: 50%;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
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

    .el-upload .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
