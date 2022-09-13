<template>
	<view class="page">
		<scroll-view scroll-y="true" class="left">
			<view :class="active===index?'active':' '" v-for="(item,index) in getimgcategory" :key="item.id"
				@click="leftActive(index,item.id)">
				{{item.title}}
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="right">
			<view class="item" v-for="item in rightList" :key="item.id">
				<image @click="prevewImages(item.img_url)" :src="item.img_url" mode=""></image>
				<br/>
				<text>{{item.title}}</text>
			</view>
			<text v-if="rightList.length==0">暂无数据</text>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				getimgcategory: [],
				active: 0,
				rightList: []
			}
		},
		onLoad() {
			this.getPicsCate()
		},
		methods: {
			async getPicsCate() {
				const res = await this.$myRequest({
					url: '/api/getimgcategory'
				})
				this.getimgcategory = res.data.message
				// console.log(res);
				this.leftActive(0, this.getimgcategory[0].id)
			},
			async leftActive(index, id) {
				this.active = index
				// 获取右侧数据
				const res = await this.$myRequest({
					url: '/api/getimages/' + id
				})
				this.rightList = [],
				this.rightList = res.data.message
				console.log(this.rightList);
			},
			prevewImages(current){
				const urls=this.rightList.map(item=>{
					return item.img_url
				})
				uni.previewImage({
					current,
					urls
				});
			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 100%;
		display: flex;
		.left {
			width: 200rpx;
			height: 100vh;
			border: 1px solid #eee;

			view {
				height: 60px;
				line-height: 60px;
				color: #333;
				font-size: 30rpx;
				text-align: center;
				border-top: 1px solid #eee;
			}

			.active {
				background-color: $shop-color;
				color: #fff;
			}
		}
		.right{
			height: 100%;
			height: 100vh;
			margin: 0 auto;
			.item{
				
				image{
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}
				text{
					font-size: 30rpx;
					line-height: 30rpx;
				}
			}
		}
	}
</style>
