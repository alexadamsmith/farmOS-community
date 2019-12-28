import axios from 'axios';


export default {
    actions: {
      // eslint-disable-next-line
      doGet({ commit, rootState }, method) {
        // TODO
        // figure out why farm/info returns the following:
        // {"detail":[{"loc":["path","farm_id"],"msg":"value is not a valid integer","type":"type_error.integer"}]}
        const headers = {
          accept: 'application/json',
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsInNjb3BlcyI6WyJmYXJtOnJlYWQiLCJmYXJtLmxvZ3MiLCJmYXJtLmluZm8iLCJmYXJtLmFzc2V0cyIsImZhcm0udGVybXMiLCJmYXJtLmFyZWFzIiwiZmFybTphdXRob3JpemUiXSwiZXhwIjoxNTc4MTY3ODQ0fQ.HGfTTfOwm6MmZk2_KiAOCt1UbOEjAr1D5aR2zECnmTg',
        }
        const request = axios.create({
          baseURL: '/api/v1/',
          headers: headers
        })
        request.get(method)
        .then((response) => {
          commit('updateResponse', response.data);
        })
        .catch((Error) => {
          this.testResponse = JSON.stringify(Error);
          // eslint-disable-next-line
          console.log(Error);
        })
      },
      // eslint-disable-next-line
      doLogin({ commit, rootState }, credentials) {
        // get a token from the aggregator!
        const headers = {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        const payload = {
          form_id: 'user_login',
          name: credentials.user,
          pass: credentials.password,
        };
        const request = axios.create({
          baseURL: '/api/v1/',
          headers: headers,
        })
        request('login/access-token', { method: 'POST', payload, auth: true })
        .then((response) => {
          commit('updateResponse', response.data);
        })
        .catch((Error) => {
          this.testResponse = JSON.stringify(Error);
          // eslint-disable-next-line
          console.log(Error);
        })
      }
    }
  }
