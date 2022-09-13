<template>
	<view class="goods_detail">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in thumimages" :key="index">
				<image :src="item.src" mode=""></image>
			</swiper-item>
		</swiper>
		<view v-for="item in goodsInfo" :key="item.id">
			<view class="box1">
				<view class="price">
					<text>￥{{item.sell_price}}</text>
					<text>￥{{item.market_price}}</text>
				</view>
				<view class="goodsNmae">
					{{item.title}}
				</view>
			</view>
			<view class="box2">
				<view>货号：{{item.goods_no}}</view>
				<view>库存：{{item.stock_quantity}}</view>
			</view>
		</view>

		<view class="box3" v-for="item in goodsDesc" :key="item.id">
			<view class="tit">{{item.title}}</view>
			<view class="content">
				<rich-text :nodes="item.content"></rich-text>
			</view>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		
	</view>
</template>

<script>
	import uGoodsNav from '@/uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	import uIcons from '@/uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
	export default {
		data() {
			return {
				id: 0,
				thumimages: [],
				goodsInfo: [],
				goodsDesc: [],
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]

			}
		},
		components: {
			uGoodsNav
		},
		onLoad(option) {
			this.id = option.id
			this.getthumimages()
			this.getinfo()
			this.getdesc()
		},
		methods: {
			async getthumimages() {
				const res = await this.$myRequest({
					url: '/api/getthumimages/' + this.id
				})
				this.thumimages = res.data.message
				// console.log(this.thumimages);
			},
			async getinfo() {
				const res = await this.$myRequest({
					url: '/api/goods/getinfo/' + this.id
				})
				this.goodsInfo = res.data.message
				// console.log(this.goodsInfo);
			},
			async getdesc() {
				const res = await this.$myRequest({
					url: '/api/goods/getdesc/' + this.id
				})
				this.goodsDesc = res.data.message
				console.log(this.goodsDesc);
			},
			 onClick (e) {
				    uni.showToast({
				      title: `点击${e.content.text}`,
				      icon: 'none'
				    })
				  },
				  buttonClick (e) {
				    console.log(e)
				    this.options[2].info++
				  }
		}
	}
</script>

<style lang="scss">
	.goods_detail {
		height: 100vh;

		image {
			width: 100%;
			height: 100%;
		}

		.box1 {
			padding: 10px;
			border-bottom: 10rpx solid #eee;

			.price {
				font-size: 35rpx;
				color: $shop_color;
				line-height: 80rpx;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goodsNmae {
				font-size: 32rpx;
				line-height: 50rpx;
			}
		}

		.box2 {
			padding: 0 10px;
			font-size: 28rpx;
			line-height: 60rpx;
			border-bottom: 10rpx solid #eee;
		}

		.box3 {
			padding-bottom: 50rpx;
			.tit {
				font-size: 32rpx;
				padding-left: 10px;
				border-bottom: 1px solid #eee;
				line-height: 80rpx;
			}

			.content {
				padding: 10px;
				font-size: 28rpx;
				color: #333;
				line-height: 50rpx;

				.gomeImgLoad {
					width: 100%;
				}
			}
		}
		.goods_nav{
			position: fixed;
			bottom: 0;
			width: 100%;
		}
	}
</style>
