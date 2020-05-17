import Vue from 'vue';
import Vuex from 'vuex';
import httpModule from './http';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    http: httpModule,
  },
  state: {
    username: null,
    response: null,
    mapboxAPIKey: null,
    farms: {},
    farmSelected: null,
  },
  getters: {
    // mapState is creating simple getters for all state properties
    // I explicitly declare additional getters here
  },
  mutations: {
    updateUsername(state, user) {
      console.log(user); // eslint-disable-line no-console
      state.username = user;
    },
    updateResponse(state, response) {
      state.response = response;
    },
    updateFarms(state, farms) {
      state.farms = farms;
    },
    updateFarmAreas(state, data) {
      // Updates all areas AND sets the farm.centroid property
      state.farms[data.farm].areas = data.areas
      state.farms[data.farm].centroid = state.farms[data.farm].areas.filter(i => i.name.includes("Centroid")).length > 0
        ? state.farms[data.farm].areas.filter(i => i.name.includes("Centroid"))[0]
        : null
    },
    updateFarmSelected(state, farm) {
      console.log(farm); // eslint-disable-line no-console
      state.farmSelected = farm;
    }
  },
  actions: {

  }
});

export default store;
