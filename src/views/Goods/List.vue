<template>
	<div>
		<Title text="商品列表"></Title>
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
					<router-link class="am-margin-right-sm" :to="{ name: 'GoodsEdit', params: { id: scope.row.id }}">
						<el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
					</router-link>
					<el-button @click="showDeleteModal(scope.row.id)" icon="el-icon-delete" plain type="danger"></el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
	import { Goods } from '@/api/index';
	import Title from '@/components/Title.vue';
	export default {
		components: {
			Title
		},
		data() {
			return {
				tableData: []
			};
		},
		created() {
			this.getGoodsList();
		},
		methods: {
			getGoodsList() {
				Goods
					.list({ pageSize: 100 })
					.then((result) => {
						if (result.status) {
							result.data.forEach(function(item, index) {
								item.create_time = new Date(item.create_time).toLocaleString()
							})
							this.tableData = result.data;
						}
					})
			},
			showDeleteModal(id) {
				this.$confirm('确定要删除该商品吗？删除之后无法恢复！！！', {
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

</style>
