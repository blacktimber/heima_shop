import App from './App'
import {myRequest} from './util/api.js'
// #ifndef VUE3
import Vue from 'vue'

Vue.prototype.$myRequest = myRequest
Vue.config.productionTip = false
Vue.filter('formatDate',(data)=>{
	const newDate = new Date(data)
	const year = newDate.getFullYear()
	const month = newDate.getMonth().toString().padStart(2,0)
	const day = newDate.getDay().toString().padStart(2,0)
	return year+'-'+month+'-'+day
})
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif