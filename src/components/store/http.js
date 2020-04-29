import axios from 'axios';

export default {

    actions: {
      // eslint-disable-next-line
      doGet({ commit, dispatch, rootState }, method) {

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
          // eslint-disable-next-line
          console.log(Error);
        })
      },

      storeResponse({ commit }, response) {
        if (response.method === "farms/info/") {
          commit('updateFarms', response.response);
        }

        if (response.method === "farms/areas/") {
          for (const farm in response.response) {
            commit('updateFarmAreas', {
              farm: farm,
              areas: response.response[farm],
            });
          }
        }
      },
      // eslint-disable-next-line
      doLogin({ commit, rootState }, credentials) {
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
            window.localStorage.setItem('username', credentials.user);
            window.localStorage.setItem('token', 'Bearer '+response.data.access_token);
            router.push({ path: `/main/`})
          })
          .catch((Error) => {
            // TODO Display an error message
            this.testResponse = JSON.stringify(Error);
            // eslint-disable-next-line
            console.log(Error);
          })
      }
    }
  }
