<template>
	<div>
		<el-table :data="tableData" style="width:100%">
			<el-table-column fixed label="商品名称" width="450">
				<template slot-scope="scope">
					<div class="goods">
						<div class="img">
							<img src="../../assets/logo.png" />
						</div>
						<div class="name">
							<span>{{scope.row.name}}</span>
							<br />
							<span>商品货号：{{scope.row.articleNo}}</span>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="价格" width="120">
			</el-table-column>
			<el-table-column prop="quantity" label="数量" width="120">
			</el-table-column>
			<el-table-column prop="create_time" label="下单时间" width="180">
			</el-table-column>
			<el-table-column prop="status" label="状态">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<router-link :to="{ name: 'GoodsEdit', params: { id: scope.row.id }}">
						<el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
					</router-link>
					<el-button @click.native.prevent="deleteRow(scope.row.id)" icon="el-icon-delete" type="danger" plain size="small"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--确认删除-->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
			<span>确定要删除该商品吗？删除之后无法恢复！！！</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>
	export default {
		data() {
			const item = {
				name: "老板抽油烟机",
				articleNo: 1564894454,
				price: 16322,
				quantity: 1,
				create_time: "2019-03-28",
				status: "已付款",
			};
			return {
				dialogVisible: false,
				tableData: Array(10).fill(item)
			};
		},
		created() {},
		methods: {}
	};
</script>
<style lang="scss" scoped>
	.goods {
		display: flex;
		align-items: center;

		.img {
			margin-right: 6px;
			border: 1px solid #eee;
		}

		.img img {
			width: 80px;
			display: block;
		}
	}
</style>
