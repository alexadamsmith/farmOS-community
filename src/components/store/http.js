import axios from 'axios';

export default {

    actions: {
      doGet({ commit, dispatch}, method) {
        const headers = {
          accept: 'application/json',
          Authorization: window.localStorage.getItem('token'),
        }
        const request = axios.create({
          baseURL: '/api/v1/',
          headers: headers
        })
        request.get(method)
        .then((response) => {
          // commit('updateRequestMethod', method)
          commit('updateResponse', method);
          dispatch('storeResponse', {method: method, response: response.data})
        })
        .catch((Error) => {
          this.testResponse = JSON.stringify(Error);
          console.log(Error); // eslint-disable-line no-console
        })
      },

      storeResponse({ commit, dispatch }, response) {
        if (response.method === "farms/info/") {
          /*
            Response is an object where top-level keys = aggregator farm IDs.
          */
          commit('updateFarms', response.response);
          for (const farm in response.response) {
            if (response.response[farm]) {
              dispatch('saveFarm', {
                farm: farm,
                data: response.response[farm],
              });
            }
          }
        }

        if (response.method === "farms/areas/") {
          /*
            Response is an object where top-level keys = aggregator farm IDs.
          */
          for (const farm in response.response) {
            if (response.response[farm].length > 0) {
              commit('updateFarmAreas', {
                farm: farm,
                areas: response.response[farm],
              });
              /* Got to write updateFarm
              dispatch('updateFarm', {
                farm: farm,
                data: {areas: response.response[farm]}
              });
              */
            }
          }
        }
      },

      doLogin({ commit }, credentials) { // eslint-disable-line no-empty-pattern
        // get a token from the aggregator!
        const router = credentials.router;

        const headers = {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic Og==',
        };
        const request = axios.create({
          baseURL: '/api/v1/',
          headers: headers,
        });

        function formatCredentials(username, password) {
          let userParsed = username.replace('@', '%40');
          return 'grant_type=password&scope=farm%3Acreate+farm%3Aread+farm%3Aupdate+farm%3Adelete+farm%3Aauthorize+farm.info+farm.logs+farm.assets+farm.terms+farm.areas&username='+userParsed+'&password='+password;
        }

        /*
        TODO:
        If the app has a token but receives a 401 (unauthorized) from the server,
        clear the token and redirect to the login page.
        */

        request.post('login/access-token', formatCredentials(credentials.user, credentials.pass) )
          .then((response) => {
            commit('updateUsername', credentials.user);
            window.localStorage.setItem('username', credentials.user);
            window.localStorage.setItem('token', 'Bearer '+response.data.access_token);
            router.push({ path: `/main/`})
          })
          .catch((Error) => {
            // TODO Display an error message
            this.testResponse = JSON.stringify(Error);
            console.log(Error); // eslint-disable-line no-console
          })
      }
    }
  }
