import Vue from 'vue';
import Vuex from 'vuex';
import httpModule from './http';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    http: httpModule,
  },
  state: {
    username: '',
    token: '',
    response: '',
  },
  mutations: {
    updateUsername(state, name) {
      state.username = name;
    },
    updateToken(state, token) {
      state.token = token;
    },
    updateResponse(state, response) {
      state.response = response;
    }
  },
  actions: {

  }
});

export default store;
