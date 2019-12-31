<template>
  <div class="primary">
    <h3>{{ msg }} as: {{ this.$store.state.username }}</h3>

    <h4>Make test request</h4>

    <select
    @input="methodSelected = $event.target.value"
    class="custom-select col-sm-3 ">
      <option>Select request method</option>
      <option
        v-for="(method, i) in requestMethods"
        v-bind:key="`log-${i}-${Math.floor(Math.random() * 1000000)}`"
        v-bind:value="method">
        {{ method }}
      </option>
  </select>

    <div class="form-item form-group">
      <button
        type="button"
        class="btn btn-success"
        @click="makeRequest()"
        name="makeTestRequest">
        Make a test request!
      </button>
    </div>

    <p>
      Test request returned: {{ this.$store.state.response }}
    </p>

  </div>
</template>

<script>

export default {
  name: 'FarmOS_Community_Aggregator',
  props: {
    msg: String
  },
  data() {
    return {
      requestMethods: [
        'users',
        'farms',
        'farms/info',
      ],
      methodSelected: ''
  }},
  methods: {
    updateUser(key, val) {
      if (key === 'name') {
        this.$store.commit('updateUserName', val)
      }
    },
    makeRequest() {
      if(this.methodSelected !== '') {
        // eslint-disable-next-line
        console.log(this.methodSelected);
        this.$store.dispatch('doGet', this.methodSelected)
      }
    },
    login() {
      this.$store.dispatch('doGet', {user: 'admin@example.com', password: 'admin'});
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
