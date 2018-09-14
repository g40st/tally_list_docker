// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store'
import {HTTP} from './helpers/http_common.js';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import Notifications from 'vue-notification'

Vue.component('icon', Icon);
Vue.use(BootstrapVue);

Vue.use(Notifications)
Vue.config.productionTip = false

Vue.prototype.$store = store;

const token = localStorage.getItem('token')
if(token) {
  HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
