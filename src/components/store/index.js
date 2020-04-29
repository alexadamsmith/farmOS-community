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
    mapboxAPIKey: null,
    farms: {},
  },
  getters: {
    // mapState is creating simple getters for all state properties
    // I explicitly declare additional getters here
  },
  mutations: {
    updateResponse(state, response) {
      state.response = response;
    },
    updateFarms(state, farms) {
      state.farms = farms;
    },
    updateFarmAreas(state, data) {
      state.farms[data.farm].areas = data.areas
    },
  },
  actions: {

  }
});

export default store;
