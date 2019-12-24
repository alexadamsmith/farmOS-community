import axios from 'axios';

export default {
    actions: {
      doGet() {
        const request = axios.create({
          baseURL: '/api',
          // headers: headers
        })
        const path = '/v1/users'
        return request.get(path).then(response => response.data);
      }
    }
  }
