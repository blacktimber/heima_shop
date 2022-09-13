<template>
	<view>
		<!-- 推荐商品列表 -->
		<good-list :goodsList="goodsList" @listClick="goGoodsDetail"></good-list>
		<view class="isOver" v-if="flag">
			————我是有底线的————
		</view>
	</view>
</template>

<script>
	import goodlist from '../../components/good-list/good-list.vue'
	export default {
		data() {
			return {
				goodsList:[],
				number:1,
				flag:false
			}
		},
		onLoad() {
			 this.getGoodsList()
		},
		components:{
			"good-list":goodlist
		},
		methods: {
			//获取商品列表数据
			async getGoodsList(callBack){
				const res = await this.$myRequest({
						url:'/api/getgoods?pageindex='+this.number
					})
					this.goodsList=[...this.goodsList,...res.data.message]
					callBack && callBack()
				},
				goGoodsDetail(id){
					// id=this.goodsList.id
					console.log(id);
					uni.navigateTo({
						url: '/pages/goods-detail/goods-detail?id='+id
					});
				}
		},
		onReachBottom(){
			if((this.goodsList.length)%10>0){
				return this.flag = true
			}
			this.number++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.goodsList=[]
			this.number=1
			this.flag=false
			setTimeout(()=>{
				this.getGoodsList(()=>{
					uni.stopPullDownRefresh()
				})
			},500)
			
		}
	}
</script>

<style>
	.isOver{
		text-align: center;
		line-height: 100rpx;
		height: 100rpx;
		background-color: #eee;
	}
</style>
