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
  },
  mutations: {
    updateResponse(state, response) {
      state.response = response;
    }
  },
  actions: {

  }
});

export default store;
