<template>
  <div id="app">
    <img alt="FarmOS logo" src="./assets/logo.png">
    <h2>FarmOS Community Aggregator</h2>

    <div
      class="card"
      v-if="this.$store.state.token === ''">
      <div class="card-body">
        <Login/>
      </div>
    </div>

    <div
      class="card"
      v-if="this.$store.state.token !== ''">
      <div class="card-body">
        <Main msg="Logged in" />
      </div>
    </div>

  </div>
</template>

<script>
import Main from './components/Main.vue'
import Login from './components/Login.vue'

export default {
  name: 'app',
  components: {
    Main,
    Login
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
