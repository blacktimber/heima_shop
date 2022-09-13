<template>
	<view class="news">
		<news-item :newsList="newsList" @itemClick="gotoDateil"></news-item>
	</view>
</template>

<script>
	import newsItem from '../../components/news-item/news-item.vue'
	export default {
		data() {
			return {
				newsList: []
			}
		},
		onLoad() {
			this.getnewsList()
		},
		components: {
			"news-item": newsItem
		},
		methods: {
			async getnewsList() {
				const res = await this.$myRequest({
					url: '/api/getnewslist'
				})
				this.newsList = res.data.message
				// console.log(res.data.message);
			},
			gotoDateil(id) {
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.news {}
</style>
