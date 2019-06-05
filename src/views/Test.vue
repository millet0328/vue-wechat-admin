<template>
	<div>
		<el-form>
			<!-- 			<el-form-item label="商品价格">
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
			<el-form-item label="折扣">
				<el-col :span="3">
					<el-input readonly v-model="form.discount">
						<template slot="append">折</template>
					</el-input>
				</el-col>
				<el-col :span="24" class="tip">根据销售价与市场价比例自动生成不需要编辑</el-col>
			</el-form-item> -->
			<input type="text" v-model="form.price">
			<input type="text" v-model="form.marketPrice">
			<input type="text" v-model="discount">
		</el-form>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					cate_1st: "",
					cate_2nd: "",
					cate_3rd: "",
					hotPoint: "",
					name: "",
					price: "",
					marketPrice: "",
					cost: "",
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
					area: "城阳区",
				},
			};
		},
		computed: {
			discount() {
				return (this.form.price / this.form.marketPrice * 100).toFixed(1);
			}
		},
	}
</script>

<style>

</style>
