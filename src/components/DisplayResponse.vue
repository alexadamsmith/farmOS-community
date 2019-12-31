<template>
  <div class="primary">

    <div
      class="card"
      v-if="this.$store.state.response !== ''">
      <div class="card-body">
        <h4 class="card-title">Test request returned:</h4>
        <p class="card-text">
          {{ this.pareseData() }}
        </p>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  props: {
    data: [Object, Array]
  },
  name: 'Display_Response',
  data() {
    return {
  }},
  methods: {
    pareseData() {
      return this.data;
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
