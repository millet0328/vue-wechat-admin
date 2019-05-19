<template>
	<div>
		<el-table :data="tableData" style="width:100%">
			<el-table-column fixed label="商品名称" width="550">
				<template slot-scope="scope">
					<div class="goods">
						<div class="img">
							<img :src="scope.row.img_md" />
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
			<el-table-column prop="inventory" label="库存" width="120">
			</el-table-column>
			<el-table-column prop="create_time" label="发布时间" width="180">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<router-link :to="{ name: 'GoodsEdit', params: { id: scope.row.id }}">
						<el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
					</router-link>

					<el-button @click.native.prevent="deleteRow(scope.row.id)" icon="el-icon-delete" class="deleteBtn" type="danger"
					 plain size="small"></el-button>
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
			return {
				dialogVisible: false,
				tableData: []
			};
		},
		created() {
			this.getGoodsList();
		},
		methods: {
			getGoodsList() {
				this.axios
					.get('/api/goods/', {
						params: {
							pageSize: 100
						}
					})
					.then((result) => {
						if (result.status) {
							result.data.forEach(function(item, index) {
								item.create_time = new Date(item.create_time).toLocaleString()
							})
							this.tableData = result.data;
						}
					})
			},
			deleteRow(id) {
				this.dialogVisible = true;
				console.log(id);
			}
		}
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

	.deleteBtn {
		margin-left: 10px;
	}
</style>
