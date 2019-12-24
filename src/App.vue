<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <CommunityTest msg="FarmOS Community Aggregator"/>
  </div>
</template>

<script>
import CommunityTest from './components/CommunityTest.vue'

export default {
  name: 'app',
  components: {
    CommunityTest
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
