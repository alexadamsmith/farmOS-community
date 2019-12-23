import Vue from 'vue';
import store from './components/store';
import App from './App.vue'; // eslint-disable-line import/extensions

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
