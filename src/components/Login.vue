<template>
  <div class="primary">

    <div class="form-item form-item-name form-group">
      <label for="name" class="control-label">Username</label>
      <input
      @input="userInput = $event.target.value"
      placeholder="Enter username"
      type="text"
      class="form-control"
      autofocus>
    </div>

    <div class="form-item form-item-name form-group">
      <label for="name" class="control-label">Password</label>
      <input
      @input="passInput = $event.target.value"
      placeholder="Enter password"
      type="text"
      class="form-control"
      autofocus>
    </div>

    <div class="form-item form-group">
      <button
        type="button"
        class="btn btn-success"
        @click="login()"
        name="userLogin">
        Log in!
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'FarmOS_Login',
  data() {
    return {
      userInput: '',
      passInput: '',
  }},
  methods: {
    login() {
      const payload = {
        user: this.userInput,
        pass: this.passInput,
        router: this.$router
      };
      this.$store.dispatch('doLogin', payload);
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
