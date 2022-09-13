<template>
	<view class="news_detail" >
		<view class="news-item" v-for="item in detail" :key="item.id">
		<text class="title">{{item.title}}</text>
		<view class="info">
			<text>发表时间：{{item.add_time | formatDate}}</text>
			<text>浏览：{{item.click}}</text>
		</view>
		<view class="content">
			<rich-text :nodes="item.content"></rich-text>
		</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				detail:[]
			}
		},
		onLoad(options) {
			this.id=options.id
			this.getNewsDetail()
		},
		methods: {
			async getNewsDetail(){
				const res = await this.$myRequest({
					url:'/api/getnew/'+this.id
				})
				this.detail=res.data.message
				// console.log(res.data);
			}
		}
	}
</script>

<style lang="scss">
.news_detail{
	font-size: 30rpx;
	padding: 0 20rpx;
	.title{
		display: block;
		width: 710rpx;
		text-align: center;
		margin: 20rpx;
	}
	.info{
		display: flex;
		justify-content: space-between;
		margin-right: 30rpx;
	}
	.content{
		display: block;
		margin-top: 30rpx;
	}
}
</style>
