<template>
  <div class="primary">
    <div>
      <!-- interactions: 'select' -->
      <!-- .concat(['SelectFeature']) -->
    <Map
      id='map'
      :overrideStyles="{ height: '60vw' }"
      :drawing="false"
      :options="{
        controls: (defs) => defs.filter(def => def.constructor.name !== 'FullScreen')
      }"
      :wkt="mapLayers" />

    <FarmInfo/>
    <!--
      <div class='card'>
        <div class='card-body'>
          <h4 class='card-title'>Areas displayed:</h4>
          <p
            v-for='(line, i) in this.parseData()'
            v-bind:key='i'>
            {{ line }}
          </p>
        </div>
      </div>
    -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Map from '@/components/Map';
import FarmInfo from '@/components/FarmInfo';
export default {
  name: 'Display_Farms',
  components: {
    Map,
    FarmInfo,
  },
  data() {
    return {
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

  },
  methods: {
    parseData() {
      return Object.keys(this.farms).map(farm => {
        return (this.farms[farm] && this.farms[farm].areas)
          ? this.farms[farm].areas.map(i => {
            return i.name.includes("Centroid")
              ? 'Farm '+farm+': '+this.farms[farm].name+', Area '+i.tid+': '+i.name
              : null
            }).filter(x => x)
          : null
      }).filter(x => x).flat()
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
