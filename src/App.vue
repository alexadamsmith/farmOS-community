<template>
  <div id="app">

    <img alt="FarmOS logo" src="./assets/logo.png">
    <h3>FarmOS Community Aggregator</h3>

    <!-- Can pass props to the router, as :data='logs' -->
    <router-view/>

  </div>
</template>

<script>

export default {
  name: 'app',

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
  margin-top: 60px;
}
</style>
