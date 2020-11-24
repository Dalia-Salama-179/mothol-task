import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import store from './store/index'
import router from './router/index'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'


Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

new Vue({
  render: h => h(App),
    router,
    store
}).$mount('#app');
