<template>
  <div id="app">
    <div class="header">
      <img alt="FarmOS logo" src="./assets/logo.png">
      <div class="userInfo">
        <h3>FarmOS Community Aggregator</h3>
        <p v-if="username">Logged in as: {{ username }}</p>
      </div>
    </div>


    <!-- Can pass props to the router, as :data='logs' -->
    <router-view/>

  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'app',
  data() {
    return {
  }},
  computed: {
    ...mapState([
      'username',
    ]),
  },
  mounted() {
    if(window.localStorage.getItem('token')) {
      this.$router.push({ path: `/main/`})
    } else {
      this.$router.push({ path: `/login/`})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
.header > * {
  display: inline-block;
  text-align: right;
}
.userInfo {
  text-align: right;
}
</style>
