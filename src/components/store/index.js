import Vue from 'vue';
import Vuex from 'vuex';
import httpModule from './http';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    http: httpModule,
  },
  state: {
    response: null,
    requestMethod: null,
    mapboxAPIKey: null,
    geometry: 'POINT (-75.16525712985431 39.95333070721313)'
  },
  mutations: {
    updateResponse(state, response) {
      state.response = response;
    },
    updateRequestMethod(state, method) {
      state.requestMethod = method;
    }
  },
  actions: {

  }
});

export default store;
