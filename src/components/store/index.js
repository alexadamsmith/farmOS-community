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
    requestMethod: null
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
