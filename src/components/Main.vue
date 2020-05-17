<template>
  <div class="primary">

    <FarmInfo/>

    <div v-if="this.response === 'farms/areas/'">
      <Map
        id='map'
        :overrideStyles="{ height: '60vw' }"
        :drawing="false"
        :options="{
          controls: (defs) => defs.filter(def => def.constructor.name !== 'FullScreen')
        }"
        :wkt="mapLayers" />

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import Map from '@/components/Map';
import FarmInfo from '@/components/FarmInfo';

export default {
  name: 'FarmOS_Community_Aggregator',
  components: {
    Map,
    FarmInfo,
  },
  data() {
    return {
    username: window.localStorage.getItem('username')
  }},
  computed: {
    ...mapState([
      'response',
      'farms',
    ]),
    mapLayers() {
      /*
       TODO:
       - Route to farm info / metrics on click
      */
      return Object.keys(this.farms).map(farm => {
        return (this.farms[farm] && this.farms[farm].centroid)
          ? {
            title: farm,
            wkt: this.farms[farm].centroid.geofield[0].geom,
            color: 'orange',
            visible: true,
            weight: 0,
            canEdit: false,}
            // params: { ID: farm }}
            // id: farm}
            // attribution: this.farms[farm].name+' '+i.name}
          : null
      }).filter(x => x);
    },
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
