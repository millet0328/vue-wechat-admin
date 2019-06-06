<template>
	<div>
		<div class="clearfix title-box am-margin-bottom-lg">
			<div class="pull-left">
				<h3 class="title">编辑商品</h3>
			</div>
			<div class="pull-right">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/goods/list' }">商品管理</el-breadcrumb-item>
					<el-breadcrumb-item>编辑商品</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
		</div>
		<el-form ref="form" :model="form" label-position="left" label-width="120px">
			<el-form-item label="商品分类">
				<el-select v-model="form.cate_1st" placeholder="请选择分类">
					<el-option v-for="item in cate_1st_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<el-select v-model="form.cate_2nd" placeholder="请选择分类">
					<el-option v-for="item in cate_2nd_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<el-select v-model="form.cate_3rd" placeholder="请选择分类">
					<el-option v-for="item in cate_3rd_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品名称">
				<el-col :span="14">
					<el-input v-model.trim="form.name"></el-input>
				</el-col>
				<el-col :span="24" class="tip">商品标题名称长度至少3个字符，最长200个汉字</el-col>
			</el-form-item>
			<el-form-item label="商品卖点">
				<el-col :span="14">
					<el-input type="textarea" v-model.trim="form.hotPoint"></el-input>
				</el-col>
				<el-col :span="24" class="tip">商品卖点不能超过140个汉字</el-col>
			</el-form-item>
			<el-form-item label="商品价格">
				<el-col :span="3">
					<el-input v-model.trim.number="form.price">
						<template slot="append">元</template>
					</el-input>
				</el-col>
				<el-col :span="24" class="tip">价格必须是0-999999之间的数字，且不能高于市场价</el-col>
				<el-col :span="24" class="tip">此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</el-col>
			</el-form-item>
			<el-form-item label="市场价">
				<el-col :span="3">
					<el-input v-model.trim.number="form.marketPrice">
						<template slot="append">元</template>
					</el-input>
				</el-col>
				<el-col :span="24" class="tip">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</el-col>
			</el-form-item>
			<el-form-item label="成本价">
				<el-col :span="3">
					<el-input v-model.trim.number="form.cost">
						<template slot="append">元</template>
					</el-input>
				</el-col>
				<el-col :span="24" class="tip">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</el-col>
			</el-form-item>
			<el-form-item label="折扣">
				<el-col :span="3">
					<el-input readonly v-model="discount">
						<template slot="append">折</template>
					</el-input>
				</el-col>
				<el-col :span="24" class="tip">根据销售价与市场价比例自动生成不需要编辑</el-col>
			</el-form-item>
			<el-form-item label="商品库存">
				<el-col :span="3">
					<el-input v-model.trim.number="form.inventory">
						<template slot="append">件</template>
					</el-input>
				</el-col>
				<el-col :span="24" class="tip">价格必须是0-999999之间的整数</el-col>
				<el-col :span="24" class="tip">若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</el-col>
			</el-form-item>
			<el-form-item label="商品货号">
				<el-col :span="3">
					<el-input v-model.trim="form.articleNo"></el-input>
				</el-col>
				<el-col :span="24" class="tip">商品货号是商家管理商品的编号，买家不可见</el-col>
				<el-col :span="24" class="tip">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</el-col>
			</el-form-item>
			<el-form-item label="商品主图">
				<el-upload :limit="1" list-type="picture-card" action="/api/upload/goods/" :headers="headers" :before-upload="handleBeforeUpload"
				 :on-success="handleMainSuccess" :before-remove="handleMainBeforeRemove" :on-exceed="handleMainExceed" :on-error="handleError"
				 :on-preview="handleCardPreview">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-col :span="24" class="tip">
					上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
					800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中
				</el-col>
			</el-form-item>
			<el-form-item label="商品轮播图">
				<el-upload :limit="6" list-type="picture-card" action="/api/upload/slider/" :headers="headers" :before-upload="handleBeforeUpload"
				 :on-success="handleSliderSuccess" :on-exceed="handleSliderExceed" :before-remove="handleSliderBeforeRemove"
				 :on-error="handleError" :on-preview="handleCardPreview">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-col :span="24" class="tip">
					上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
					800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中
				</el-col>
			</el-form-item>
			<div class="section-title">商品详情描述</div>
			<el-form-item label="商品品牌">
				<el-col :span="14">
					<el-input v-model.trim="form.brand"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="商品描述">
				<div id="toolbar" class="w-e-toolbar"></div>
				<div id="editor" class="w-e-text-container"></div>
			</el-form-item>
			<div class="section-title">商品物流信息</div>
			<el-form-item label="所在地">
				<el-select v-model="form.province" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					<el-option label="区域三" value="beijing"></el-option>
				</el-select>
				<el-select v-model="form.city" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					<el-option label="区域三" value="beijing"></el-option>
				</el-select>
				<el-select v-model="form.area" placeholder="请选择活动区域">
					<el-option label="区域一" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
					<el-option label="区域三" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="运费">
				<el-col :span="3">
					<el-input v-model.trim="form.freight">
						<template slot="append">元</template>
					</el-input>
				</el-col>
				<el-col :span="24" class="tip">运费设为0，前台商品将显示免运费</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="releaseHandle">提交</el-button>
			</el-form-item>
		</el-form>
		<!-- 图片预览 -->
		<el-dialog width="30%" :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt>
		</el-dialog>
	</div>
</template>
<script>
	import { Upload, Category, Goods } from "@/api/index";
	import E from "wangeditor";

	var editor = new E("#toolbar", "#editor");

	export default {
		props: ["id"],
		data() {
			return {
				dialogImageUrl: "",
				dialogVisible: false,
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				form: {
					cate_1st: "",
					cate_2nd: "",
					cate_3rd: "",
					hotPoint: "",
					name: "",
					price: "",
					marketPrice: "",
					cost: "",
					discount: "",
					inventory: "",
					articleNo: "",
					img_lg: "",
					img_md: "",
					slider: "",
					brand: "",
					detail: "",
					freight: "0",
					province: "山东省",
					city: "青岛市",
					area: "城阳区"
				},
				cate_1st_options: [],
				cate_2nd_options: [],
				cate_3rd_options: []
			};
		},
		computed: {
			discount() {
				let discount = ((this.form.price / this.form.marketPrice) * 10).toFixed(2);
				this.form.discount = discount;
				switch (discount) {
					case "NaN":
						return "";
						break;
					case "Infinity":
						return "";
						break;
					default:
						return discount;
						break;
				}
			}
		},
		async created() {
			// 获取参数对应的数据
			let data = await this.getDetail();
			data.detail = data.detail.replace(/http:127.0.0.1:3000/g, '..');
			editor.txt.html(data.detail);
			// 加载一级分类
			this.cateChangeHandle(1, "cate_1st");
		},
		mounted() {
			editor.customConfig.zIndex = 100;
			//配置上传图片
			editor.customConfig.uploadImgServer = "/api/upload/editor/";
			editor.customConfig.uploadFileName = "file";
			// 配置header信息
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`
			}
			//同步HTML代码至data
			editor.customConfig.onchange = html => {
				this.form.detail = html;
			};
			editor.create();
		},
		watch: {
			"form.cate_1st"(newValue, oldValue) {
				this.cateChangeHandle(newValue, "cate_2nd");
			},
			"form.cate_2nd"(newValue, oldValue) {
				this.cateChangeHandle(newValue, "cate_3rd");
			}
		},
		methods: {
			async getDetail() {
				let { status, data } = await Goods.getDetail({ id: this.id });
				if (status) {
					this.form = data;
					return Promise.resolve(data);
				}
			},
			//分类change事件
			cateChangeHandle(id, cate) {
				if (!id) {
					return false;
				}
				this.getOptions(id).then(data => {
					this[cate + "_options"] = data;
					//如果数组为空，下一级分类设置为空
					if (data.length == 0) {
						this.form[cate] = "";
						return false;
					}
					//默认选择数组第一项
					this.form[cate] = data[0].id;
				});
			},
			//获取下一级分类
			async getOptions(id) {
				let { status, data, msg } = await Category.load({ pId: id });
				if (status) {
					return Promise.resolve(data);
				} else {
					this.$message.error(msg);
				}
			},
			handleMainSuccess(response, file, fileList) {
				if (response.status) {
					this.form.img_lg = response.lgImg;
					this.form.img_md = response.mdImg;
				}
			},
			handleError(err, file, fileList) {
				let { status, message } = err;
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
			handleBeforeUpload(file) {
				let reg = /^image\/(jpe?g|png)$/;
				const isImg = reg.test(file.type);
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isImg) {
					this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
				}
				if (!isLt2M) {
					this.$message.error("上传头像图片大小不能超过 2MB!");
				}
				return isImg && isLt2M;
			},
			async handleMainBeforeRemove(file, fileList) {
				try {
					let res1 = await Upload.deleteImage({ src: "." + file.response.lgImg });
					let res2 = await Upload.deleteImage({ src: "." + file.response.mdImg });
					if (res1.status && res2.status) {
						//清空图片
						this.form.img_lg = "";
						this.form.img_md = "";
						return true;
					} else {
						return false;
					}
				} catch (e) {
					this.$message.error(e);
				}
			},
			handleCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleMainExceed(files, fileList) {
				this.$message.warning(
					`当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
				);
			},
			handleSliderSuccess(response, file, fileList) {
				if (response.status) {
					this.form.slider = this.convertFileList(fileList);
				}
			},
			handleSliderExceed(files, fileList) {
				this.$message.warning(
					`当前限制选择 6 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
				);
			},
			async handleSliderBeforeRemove(file, fileList) {
				let { status } = await Upload.deleteImage({
					src: "." + file.response.src
				});
				if (status) {
					this.form.slider = this.convertFileList(fileList);
					return true;
				} else {
					return false;
				}
			},
			//转换数据格式
			convertFileList(fileList) {
				let res = [];
				fileList.forEach(function(item, index) {
					res.push(item.response.src);
				});
				return res.toString();
			},
			//发布商品
			async releaseHandle() {
				let { status } = await Goods.release(this.form);
				if (status) {
					this.$message.success("发布商品成功！");
				}
			}
		}
	};
</script>
<style scoped>
	.title-box {
		border-bottom: 1px solid #409eff;
	}

	.title-box h3 {
		margin-top: 0;
	}

	.tip {
		font-size: 12px;
		color: #999;
	}

	.section-title {
		background-color: #f5f5f5;
		padding: 10px;
		margin-bottom: 10px;
	}

	.el-upload img {
		max-width: 100%;
	}

	.w-e-toolbar {
		border: 1px solid #ccc;
		border-bottom: 0;
	}

	.w-e-text-container {
		border: 1px solid #ccc;
		min-height: 300px;
	}
</style>
