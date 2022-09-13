const Base_url='http://localhost:8082'
export const myRequest =(option)=>{
	return new Promise((resolve,rejet)=>{
		uni.request({
			url:Base_url+option.url,
			method:option.method || 'GET',
			data:option.data || {},
			success:(res) =>{
				if(res.data.status !== 0){
					return uni.showToast({
						title:'获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err) => {
				return uni.showToast({
					title:'请求接口失败'
				})
				rejet(err)
			}
		})
	})
}