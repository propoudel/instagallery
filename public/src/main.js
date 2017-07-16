
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import API from './API'
import Store from './Store'

axios.defaults.baseURL = 'http://127.0.0.1:8000';

window.axios = axios
window.API = API
window.Store = Store

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
