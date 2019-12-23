import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: [],
  },
  mutations: {
    updateUserName(state, name) {
      state.username = name;
    }
  },
  actions: {

  }
});

export default store;
