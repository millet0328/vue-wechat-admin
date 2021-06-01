<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>订单列表</span>
			</div>
			<!-- table -->
			<el-table :data="tableData" style="width:100%">
				<el-table-column prop="id" label="#" width="50">
				</el-table-column>
				<el-table-column width="600">
					<template slot-scope="scope">
						<el-table :data="scope.row.goodsList">
							<el-table-column prop="name" label="商品" width="400">
								<template slot-scope="scope">
									<div class="goods">
										<div class="photo">
											<img :src="scope.row.img_md" />
										</div>
										<div class="name">
											<span>{{scope.row.name}}</span>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="goods_price" label="单价">
							</el-table-column>
							<el-table-column prop="goods_num" label="数量">
							</el-table-column>
						</el-table>
					</template>
				</el-table-column>
				<el-table-column prop="payment" label="付款总额">
				</el-table-column>
				<el-table-column prop="create_time" sortable label="下单时间" width="180">
				</el-table-column>
				<el-table-column prop="status" sortable label="状态">
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script>
	import { Order } from '@/api/index';

	export default {
		data() {
			return {
				tableData: []
			};
		},
		created() {
			this.loadList();
			document.title = "订单列表";
		},
		methods: {
			async loadList() {
				let { status, data } = await Order.loadList({ status: 'all', pageSize: 200, pageIndex: 1 });
				if (status) {
					data.forEach(function(item) {
						item.create_time = new Date(item.create_time).toLocaleString()
					});
					this.tableData = data;
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	.goods {
		display: flex;
		align-items: center;

		.photo {
			margin-right: 6px;
			border: 1px solid #eee;
		}

		.photo img {
			width: 80px;
			display: block;
		}
	}
</style>
