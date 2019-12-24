<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Username: {{ this.$store.state.username }}
    </p>

    <div class="form-item form-item-name form-group">
      <label for="name" class="control-label">Name</label>
      <input
      @input="updateUser('name', $event.target.value)"
      placeholder="Enter username"
      type="text"
      class="form-control"
      autofocus>
    </div>

    <div class="form-item form-group">
      <button
        type="button"
        class="btn btn-success"
        @click="makeTestRequest()"
        name="makeTestRequest">
        Make a test request!
      </button>
    </div>

    <p>
      Test request returned: {{ this.testResponse }}
    </p>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      testResponse: ''
  }},
  methods: {
    updateUser(key, val) {
      if (key === 'name') {
        this.$store.commit('updateUserName', val)
      }
    },
    makeTestRequest() {
      this.$store.dispatch('doGet', '/v1/users')
        .then((response) => {
          this.testResponse = JSON.stringify(response);
          // eslint-disable-next-line
          console.log(response);
        })
        .catch((Error) => {
          this.testResponse = JSON.stringify(Error);
          // eslint-disable-next-line
          console.log(Error);
        })
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
