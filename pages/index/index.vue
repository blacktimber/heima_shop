<template>
	<view class="content">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
			<swiper-item v-for="item in seipers" :key="item.id">
				<img :src="item.img" alt="" class="swiper_img">
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="item in navList" :key="item.id" @click="goto(item.path)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>
		<!-- 推荐商品区域 -->
		<view class="hot_goods">
			<view class="tit">
				推荐商品
			</view>
			<!-- 推荐商品列表 -->
			<good-list :goodsList="goodsList" @listClick="goGoodsDetail"></good-list>
		</view>
		</view>
	</view>
</template>

<script>
	import goodlist from '../../components/good-list/good-list.vue'
	export default {
		data() {
			return {
				seipers:[],
				goodsList:[],
				navList:[
					{
						icon:'iconfont icon-ziyuan',
						title:'黑马超市',
						path:'/pages/goods/goods'
					},
					{
						icon:'iconfont icon-guanyuwomen',
						title:'联系我们',
						path:'/pages/contact/contact'
					},
					{
						icon:'iconfont icon-tupian',
						title:'社区图片',
						path:'/pages/pics/pics'
					},
					{
						icon:'iconfont icon-shipin',
						title:'学习我们',
						path:'/page/goods/goods'
					}
				]
			}
		},
		onLoad() {
			this.getSwipers()
			 this.getHotGoods()
		},
		components:{
			"good-list":goodlist
		},
		methods: {
		// 获取轮播图数据 
			async getSwipers(){
			const res = await this.$myRequest({
					url:'/api/getlunbo'
				})
				this.seipers=res.data.message
				// console.log(this.seipers);
			},
		
		// 获取热门商品数据 
		async getHotGoods(){
			const res = await this.$myRequest({
					url:'/api/getgoods?pageindex=1'
				})
				this.goodsList=res.data.message
				console.log(this.goodsList);
			},
		goto(path){
			uni.navigateTo({
				url: path
			});
		},
		goGoodsDetail(id){
			// id=this.goodsList.id
			console.log(id);
			uni.navigateTo({
				url: '/pages/goods-detail/goods-detail?id='+id
			});
		}
		},
	}
</script>

<style lang="scss">
	.content swiper{
		width: 750rpx;
		height: 400rpx;
	}
	.swiper_img{
		width: 100%;
	}
	.nav{
		display: flex;
		.nav_item{
			width: 25%;
			text-align: center;
			view{
				width: 120rpx;
				height: 120rpx;
				background-color: $shop-color;
				border-radius: 50%;
				line-height: 120rpx;
				margin: 10px auto;
				color: #fff;
				font-size: 45rpx
			}
			text{
				font-size: 35rpx;
			}
		}
	}
	.hot_goods{
		background-color: #eee;
		overflow: hidden;
		margin-top: 20rpx;
		.tit{
			height: 100rpx;
			line-height: 100rpx;
			color: $shop-color;
			font-size: 40rpx;
			text-align: center;
			letter-spacing: 40rpx;
			background-color: #fff;
			margin: 7rpx 0;
		}
	}

</style>
