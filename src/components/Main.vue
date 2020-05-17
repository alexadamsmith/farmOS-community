<template>
  <div class="primary">

    <h4>Click on the farms below to see information:</h4>

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
