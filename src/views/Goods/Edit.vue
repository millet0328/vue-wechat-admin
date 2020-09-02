<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>编辑商品</span>
			</div>
			<el-form ref="form" :model="form" :rules="rules" label-position="left" label-width="110px">
				<el-row>
					<el-col :span="5">
						<el-form-item prop="cate_1st" label="商品分类">
							<el-select v-model="form.cate_1st" @change="cate_1st_handle" placeholder="请选择一级分类">
								<el-option v-for="item in cate_1st_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item prop="cate_2nd">
							<el-select v-model="form.cate_2nd" @change="cate_2nd_handle" placeholder="请选择二级分类">
								<el-option v-for="item in cate_2nd_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item prop="cate_3rd">
							<el-select v-model="form.cate_3rd" placeholder="请选择三级分类">
								<el-option v-for="item in cate_3rd_options" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item prop="name" label="商品名称">
					<el-col :span="14">
						<el-input v-model.trim="form.name"></el-input>
					</el-col>
					<el-col :span="24" class="tip">商品标题名称长度至少3个字符，最长200个汉字</el-col>
				</el-form-item>
				<el-form-item prop="hotPoint" label="商品卖点">
					<el-col :span="14">
						<el-input type="textarea" v-model.trim="form.hotPoint"></el-input>
					</el-col>
					<el-col :span="24" class="tip">商品卖点不能超过140个汉字</el-col>
				</el-form-item>
				<el-form-item prop="price" label="商品价格">
					<el-col :span="4">
						<el-input v-model.trim.number="form.price">
							<template slot="append">元</template>
						</el-input>
					</el-col>
					<el-col :span="24" class="tip">价格必须是0-999999之间的数字，且不能高于市场价</el-col>
					<el-col :span="24" class="tip">此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</el-col>
				</el-form-item>
				<el-form-item prop="marketPrice" label="市场价">
					<el-col :span="4">
						<el-input v-model.trim.number="form.marketPrice">
							<template slot="append">元</template>
						</el-input>
					</el-col>
					<el-col :span="24" class="tip">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</el-col>
				</el-form-item>
				<el-form-item prop="cost" label="成本价">
					<el-col :span="4">
						<el-input v-model.trim.number="form.cost">
							<template slot="append">元</template>
						</el-input>
					</el-col>
					<el-col :span="24" class="tip">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</el-col>
				</el-form-item>
				<el-form-item label="折扣">
					<el-col :span="4">
						<el-input readonly v-model="discount">
							<template slot="append">折</template>
						</el-input>
					</el-col>
					<el-col :span="24" class="tip">根据销售价与市场价比例自动生成不需要编辑</el-col>
				</el-form-item>
				<el-form-item prop="inventory" label="商品库存">
					<el-col :span="4">
						<el-input v-model.number="form.inventory">
							<template slot="append">件</template>
						</el-input>
					</el-col>
					<el-col :span="24" class="tip">库存必须是0-999999之间的整数</el-col>
					<el-col :span="24" class="tip">若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</el-col>
				</el-form-item>
				<el-form-item prop="articleNo" label="商品货号">
					<el-col :span="4">
						<el-input v-model.trim="form.articleNo"></el-input>
					</el-col>
					<el-col :span="24" class="tip">商品货号是商家管理商品的编号，买家不可见</el-col>
					<el-col :span="24" class="tip">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</el-col>
				</el-form-item>
				<el-form-item prop="img_lg" label="商品主图">
					<upload :src.sync="form.img_md" :lg-img.sync="form.img_lg" remove-action="/api/upload" upload-action="/api/upload/goods"></upload>
					<el-col :span="24" class="tip">
						上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
						800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中
					</el-col>
				</el-form-item>
				<el-form-item prop="slider" label="商品轮播图">
					<el-upload :limit="6" list-type="picture-card" :file-list="sliderFileList" action="/api/upload/slider/" :headers="headers" :before-upload="handleBeforeUpload"
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
				<el-form-item prop="brand" label="商品品牌">
					<el-col :span="14">
						<el-input v-model.trim="form.brand"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item prop="detail" label="商品描述">
					<div ref="toolbar" class="w-e-toolbar"></div>
					<div ref="editor" class="w-e-text-container"></div>
				</el-form-item>
				<div class="section-title">商品物流信息</div>
				<el-row>
					<el-col :span="5">
						<el-form-item prop="province" label="所在地">
							<el-select v-model="form.province" placeholder="请选择省份">
								<el-option v-for="item in province_options" :label="item.name" :value="item.province_id" :key="item._id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item prop="city">
							<el-select v-model="form.city" placeholder="请选择城市">
								<el-option v-for="item in city_options" :label="item.name" :value="item.city_id" :key="item._id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item prop="county">
							<el-select v-model="form.county" placeholder="请选择区//县">
								<el-option v-for="item in county_options" :label="item.name" :value="item.county_id" :key="item._id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="5">
						<el-form-item prop="town">
							<el-select v-model="form.town" placeholder="请选择街道">
								<el-option v-for="item in town_options" :label="item.name" :value="item.town_id" :key="item._id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item prop="freight" label="运费">
					<el-col :span="3">
						<el-input v-model.number="form.freight">
							<template slot="append">元</template>
						</el-input>
					</el-col>
					<el-col :span="24" class="tip">运费设为0，前台商品将显示免运费</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="success" @click="handleEdit">提交</el-button>
				</el-form-item>
			</el-form>
			<!-- 图片预览 -->
			<el-dialog width="30%" :visible.sync="dialogVisible">
				<img width="100%" :src="dialogImageUrl" alt>
			</el-dialog>
		</el-card>
	</div>
</template>
<script>
	import { Upload, Category, Goods, PCCT } from "@/api/index";
	import E from "wangeditor";

	import upload from "@/components/Upload.vue";

	export default {
		props: ["id"],
		components: {
			upload
		},
		data() {
			return {
				fileList: [],
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
					inventory: 1000,
					articleNo: "",
					img_lg: "",
					img_md: "",
					slider: "",
					brand: "",
					detail: "",
					freight: 0,
					province: "",
					city: "",
					county: "",
					town: "",
				},
				rules: {
					cate_1st: [
						{ required: true, message: '请选择商品所属的一级分类', trigger: 'blur' },
					],
					cate_2nd: [
						{ required: true, message: '请选择商品所属的二级分类', trigger: 'blur' },
					],
					cate_3rd: [
						{ required: true, message: '请选择商品所属的三级分类', trigger: 'blur' },
					],
					hotPoint: [
						{ required: false, message: '请输入商品的卖点', trigger: 'blur' },
						{ type: 'string', max: 140, message: '商品卖点不能超过140个汉字', trigger: 'blur' },
					],
					name: [
						{ required: true, message: '请输入商品的名称', trigger: 'blur' },
						{ type: 'string', min: 3, max: 200, message: '商品标题名称长度至少3个字符，最长200个汉字', trigger: 'blur' },
					],
					price: [
						{ required: true, message: '请输入商品的价格', trigger: 'blur' },
						{ pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '价格必须是0-999999之间的数字，且不能高于市场价', trigger: 'blur' },
					],
					marketPrice: [
						{ required: true, type: 'float', message: '请输入商品的市场价', trigger: 'blur' },
						{ pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '价格必须是0-999999之间的数字', trigger: 'blur' },
					],
					cost: [
						{ required: true, type: 'float', message: '请输入商品的成本价', trigger: 'blur' },
						{ pattern: /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/, message: '价格必须是0-999999之间的数字', trigger: 'blur' },
					],
					inventory: [
						{ required: true, type: 'integer', message: '请输入商品的库存数量', trigger: 'blur' },
						{ min: 0, max: 999999, type: 'integer', message: '库存必须是0-999999之间的整数', trigger: 'blur' },
					],
					articleNo: [
						{ required: true, type: 'string', message: '请输入商品的货号', trigger: 'blur' },
						{ pattern: /^[\w\u4E00-\u9FA5-./]{1,20}$/, message: '最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点', trigger: 'blur' },
					],
					img_lg: [
						{ required: true, message: '请上传一张图片主图', trigger: 'blur' },
					],
					slider: [
						{ required: true, message: '请上传至少一张轮播图照片', trigger: 'blur' },
					],
					brand: [
						{ required: true, message: '请输入商品的品牌名称', trigger: 'blur' },
					],
					detail: [
						{ required: true, message: '请填写商品详情', trigger: 'blur' },
					],
					freight: [
						{ required: true, type: 'number', message: '请填写商品的运费', trigger: 'blur' },
						{ min: 0, type: 'number', message: '运费必须是0-999999之间的数字', trigger: 'blur' },
					],
					province: [
						{ required: true, message: '请选择省份', trigger: 'blur' },
					],
					city: [
						{ required: true, message: '请选择城市', trigger: 'blur' },
					],
					county: [
						{ required: true, message: '请选择区县', trigger: 'blur' },
					],
					town: [
						{ required: true, message: '请选择街道', trigger: 'blur' },
					]
				},
				cate_1st_options: [],
				cate_2nd_options: [],
				cate_3rd_options: [],
				province_options: [],
				city_options: [],
				county_options: [],
				town_options: [],
				mainFileList: [],
				sliderFileList: [],
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
		created() {
			document.title = "商品编辑";
		},
		async mounted() {
			// 获取参数对应的数据
			let data = await this.getDetail();
			//富文本编辑器
			const editor = new E(this.$refs.toolbar, this.$refs.editor);
			editor.customConfig.zIndex = 100;
			//配置上传图片
			editor.customConfig.uploadImgServer = "/api/upload/editor/";
			editor.customConfig.uploadFileName = "file";
			// 配置header信息
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`
			};
			//同步HTML代码至data
			editor.customConfig.onchange = html => {
				this.form.detail = html;
			};
			editor.create();
			editor.txt.html(data.detail);
			// 加载三级分类
			this.handleCateChange(1, "cate_1st", false);
			this.handleCateChange(data.cate_1st, "cate_2nd", false);
			this.handleCateChange(data.cate_2nd, "cate_3rd", false);
			// 主图
			if (data.img_md) {
				this.mainFileList = [{
					name: '1.jpg',
					url: data.img_md,
				}];
			}
			// 轮播图
			let arr = data.slider.split(',');
			let list = arr.map(function(item, index) {
				let obj = {};
				obj.url = item;
				obj.name = index + '.jpg';
				obj.response = { src: item };
				return obj;
			});
			this.sliderFileList = list;
			// 获取所有省份
			this.loadProvince();
		},
		methods: {
			async getDetail() {
				let { status, data } = await Goods.getDetail({ id: this.id });
				if (status) {
					this.form = data;
					this.form.id = this.id;
					return Promise.resolve(data);
				}
			},
			//分类change事件
			cate_1st_handle(id) {
				this.handleCateChange(id, "cate_2nd");
			},
			cate_2nd_handle(id) {
				this.handleCateChange(id, "cate_3rd");
			},
			async handleCateChange(id, cate, setDefault = true) {
				let data = await this.getOptions(id);
				this[cate + "_options"] = data;
				//如果数组为空，下一级分类设置为空
				if (data.length === 0) {
					this.form[cate] = undefined;
					return false;
				}
				if (setDefault) {
					//默认选择数组第一项
					this.form[cate] = data[0].id;
				}
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
			// 获取省份
			async loadProvince() {
				let { status, data } = await PCCT.province();
				if (status) {
					this.province_options = data;
					//默认选择数组第一项
					this.form.province = data[0].province_id;
				}
			},
			// 根据省id获取城市
			async loadCity(id) {
				let { status, data } = await PCCT.city({ id });
				if (status) {
					this.city_options = data;
					//默认选择数组第一项
					this.form.city = data[0].city_id;
				}
			},
			// 根据市区id获取县区
			async loadCounty(id) {
				let { status, data } = await PCCT.county({ id });
				if (status) {
					this.county_options = data;
					//默认选择数组第一项
					this.form.county = data[0].county_id;
				}
			},
			// 根据市区id获取县区
			async loadTown(id) {
				let { status, data } = await PCCT.town({ id });
				if (status) {
					this.town_options = data;
					//默认选择数组第一项
					this.form.town = data[0].town_id;
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
					let res1 = await Upload.remove({ src: "." + this.form.img_lg });
					let res2 = await Upload.remove({ src: "." + this.form.img_md });
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
					`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
				);
			},
			handleSliderSuccess(response, file, fileList) {
				if (response.status) {
					this.form.slider = this.convertFileList(fileList);
				}
			},
			handleSliderExceed(files, fileList) {
				this.$message.warning(
					`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
				);
			},
			async handleSliderBeforeRemove(file, fileList) {
				let src = file.response.src.replace(/.+\/images/, "./images");

				let { status } = await Upload.remove({ src });

				if (status) {
					let i = fileList.findIndex(item => item.url == file.response.src);
					let copy = [...fileList];
					copy.splice(i, 1);
					this.form.slider = this.convertFileList(copy);
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
			//修改商品
			async handleEdit() {
				let { status } = await Goods.update(this.form);
				if (status) {
					this.$message.success("更新商品成功！");
				}
			}
		}
	};
</script>
<style scoped>
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
