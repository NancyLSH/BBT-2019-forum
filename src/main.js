import Vue from 'vue'
import router from "./router"
import Router from 'vue-router'
import axios from 'axios'
import App from './App.vue'
import './plugins/element.js'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)
Vue.prototype.$axios=axios;
axios.defaults.withCredentials=true;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
