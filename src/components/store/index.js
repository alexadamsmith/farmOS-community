import Vue from 'vue';
import Vuex from 'vuex';
import httpModule from './http';
import idb from './idb';
//import idb from '@/api/idb';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    http: httpModule,
    //idb: idbModule,
  },
  state: {
    username: null,
    response: null,
    mapLayers: null,
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
      state.username = user;
    },
    updateResponse(state, response) {
      state.response = response;
    },
    updateMapLayers(state, layers) {
      state.mapLayers = layers;
    },
    updateFarms(state, farms) {
      // Replace with/ pair with idb action
      state.farms = farms;
    },
    updateFarmAreas(state, data) {
      // Replace with/ pair with idb action
      // Updates all areas AND sets the farm.centroid property
      state.farms[data.farm].areas = data.areas
      state.farms[data.farm].centroid = state.farms[data.farm].areas.filter(i => i.name.includes("Centroid")).length > 0
        ? state.farms[data.farm].areas.filter(i => i.name.includes("Centroid"))[0]
        : null
    },
    updateFarmSelected(state, farm) {
      state.farmSelected = farm;
    }
  },
  actions: {
    /*
      IDB notes:
      I need to cache farms, but will I ever be retrieving only an individual farm?
      I will always retrieve farmInfo for ALL farms
      In the future, I will retrieve farmData for individual farms or sets of farms
      FarmData, when it is incorporated, can exist as a separate object in the store

      Could do two levels:
      farmIndices


      actions and idb.js from https://www.raymondcamden.com/2019/10/16/using-indexeddb-with-vuejs
    */


    async deleteFarm(context, farm) {
      //not calling this yet
      await idb.deleteFarm(farm);
    },
    async getFarms(context) {
      // not calling this yet
      // context.state.farms = [];
      context.state.farms = {};
      let farms = await idb.getFarms();

      farms.forEach(c => {
        //context.state.farms.push(c);
        context.state.farms[c.id] = c;
        //this will still create an extraneous id field inside the object
      });

    },
    async saveFarm(context, farm) {
      let newFarm = farm.data
      newFarm.id = farm.farm
      await idb.saveFarm(newFarm);
    }

  }
});

export default store;
