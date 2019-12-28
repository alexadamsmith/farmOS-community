import Vue from 'vue';
import Vuex from 'vuex';
import httpModule from './http';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    http: httpModule,
  },
  state: {
    username: 'users',
    response: '',
  },
  mutations: {
    updateUserName(state, name) {
      state.username = name;
    },
    updateResponse(state, response) {
      state.response = response;
    }
  },
  actions: {

  }
});

export default store;
