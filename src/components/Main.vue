<template>
  <div class="primary">

    <h4>Logged in as: {{ username }}</h4>

    <h4>Centroids of aggregated farms:</h4>

    <!--
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
    -->
    <!-- requestMethods.indexOf('method') -->
    <!-- v-bind:key="`log-${i}-${Math.floor(Math.random() * 1000000)}`" -->
    <!--
    <div class="form-item form-group">
      <button
        type="button"
        class="btn btn-success"
        @click="getFarmInfo()"
        name="makeTestRequest">
        Get Farm Info!
      </button>
    </div>
    -->

    <div v-if="this.response === 'farms/areas/'">
      <DisplayFarms/>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import DisplayFarms from '@/components/DisplayFarms';

export default {
  name: 'FarmOS_Community_Aggregator',
  components: {
    DisplayFarms,
  },
  data() {
    return {
    username: window.localStorage.getItem('username')
  }},
  computed: {
    ...mapState([
      'response',
    ]),
  },
  mounted() {
    this.getFarmInfo();
  },
  methods: {
    /*
    Available request methods:
    'users/',
    'farms/',
    'farms/info/',
    'farms/areas/',
    */
    getFarmInfo() {
      this.$store.commit('updateResponse', '');
      this.$store.dispatch('doGet', 'farms/info/').then(
        this.$store.dispatch('doGet', 'farms/areas/')
      )
    }
  },
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
