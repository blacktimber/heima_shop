<template>
	<view>
		<view class="news_item" @click="navigator(item.id)" v-for="item in newsList" :key="item.id">
			<image :src="item.img_url" mode=""></image>
			<view class="news_item_right" >
				<view class="tit">
					{{item.title}}
				</view>
				<view class="info">
					<text>发表时间：{{item.add_time | formatDate}}</text>
					<text>浏览：{{item.click}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['newsList'],
		data() {
			return {
				
			}
		},
		methods: {
			navigator(id){
				this.$emit('itemClick',id)
			}
		},
		filters:{
			formatDate(data){
				// console.log(data);
				const newDate = new Date(data)
				const year = newDate.getFullYear()
				const month = newDate.getMonth().toString().padStart(2,0)
				const day = newDate.getDay().toString().padStart(2,0)
				return year+'-'+month+'-'+day
			}
		}
	}
</script>

<style lang="scss">
.news_item{
			display: flex;
			border-bottom: 1px solid $shop_color;
			padding: 10rpx 20rpx;
			image{
				min-width: 200rpx;
				max-width: 200rpx;
				height: 150rpx;
			}
			.news_item_right{
				margin-left: 15rpx;
				display: flex;
				flex-direction: column;
				.tit{
					font-size: 30rpx;
				}
				.info{
					margin-top: 20rpx;
					font-size: 15rpx;
					text:nth-child(2){
						margin-left: 30rpx;
					}
				}
			}
		}
</style>
