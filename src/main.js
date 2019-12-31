import Vue from 'vue';
import store from './components/store';
import router from './components/router';
import App from './App.vue'; // eslint-disable-line import/extensions

Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
