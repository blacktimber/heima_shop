<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg" mode=""></image>
		<view class="info">
			<view @click="callPhone">联系电话：400-618-9090 点击拨打）</view>
			<view>校区地址：浙江省杭州市下沙经济开发区4号大街187号盛泰时代</view>
		</view>
		<map  class="map" :show-location="true" :scale="scale" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 latitude: 30.312212,
				 longitude: 120.363172,
				 scale:13,
				 markers:[{
					 latitude: 30.312212,
					 longitude: 120.363172,
					 iconPath:'../../static/hmlogo.png',
					 width:30,
					 height:30
				 }]
			}
		},
		methods: {
			callPhone(){
				uni.makePhoneCall({
					phoneNumber: '400-618-9090' //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss">
.contact{
	.img{
		width: 100%;
		height: 320rpx;
	}
	.info {
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		view{
			line-height: 70rpx;
			border-bottom: 1px solid #eee;
		}
	}
	.map{
		width: 100%;
		height: 700rpx;
	}
}
</style>
