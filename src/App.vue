<template>
  <div id="app">

    <img alt="FarmOS logo" src="./assets/logo.png">
    <h2>FarmOS Community Aggregator</h2>

    <router-view></router-view>

  </div>
</template>

<script>

export default {
  name: 'app',

  mounted() {
    if(this.$store.state.token === '') {
      this.$router.push({ path: `/login/`})
    } else {
      this.$router.push({ path: `/main/`})
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
