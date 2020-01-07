<template>
  <div class="primary">

    <h4>Logged in as: {{ username }}</h4>

    <h4>Make test request</h4>

    <!-- I need to clean this up! -->
    <select
    @input="methodSelected = $event.target.value"
    class="custom-select col-sm-3 ">
      <option
        v-for="(method, i) in requestMethods"
        v-bind:key="i"
        :value="method">
        {{ method }}
      </option>
    </select>
    <!-- requestMethods.indexOf('method') -->
    <!-- v-bind:key="`log-${i}-${Math.floor(Math.random() * 1000000)}`" -->

    <div class="form-item form-group">
      <button
        type="button"
        class="btn btn-success"
        @click="makeRequest()"
        name="makeTestRequest">
        Make a test request!
      </button>
    </div>

    <div v-if="this.$store.state.response !== null">
      <DisplayResponse
        :data="this.$store.state.response"
        :method="this.$store.state.requestMethod"
        />
    </div>

  </div>
</template>

<script>
import DisplayResponse from '@/components/DisplayResponse';

export default {
  name: 'FarmOS_Community_Aggregator',
  components: {
    DisplayResponse,
  },
  data() {
    return {
      requestMethods: [
        'Select request method',
        'users/',
        'farms/',
        'farms/info/',
        'farms/logs/',
      ],
      methodSelected: '',
      username: window.localStorage.getItem('username')
  }},
  methods: {
    makeRequest() {
      if(this.methodSelected !== '' && this.methodSelected !== 'Select request method') {
        this.$store.commit('updateResponse', '');
        this.$store.dispatch('doGet', this.methodSelected)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
