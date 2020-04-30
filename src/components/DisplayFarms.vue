<template>
  <div class="primary">
    <div>
    <Map
      id='map'
      :overrideStyles="{ height: '60vw' }"
      :drawing="false"
      :options="{
        controls: (defs) => defs.filter(def => def.constructor.name !== 'FullScreen')
      }"
      :wkt="mapLayers" />

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

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Map from '@/components/Map';
export default {
  name: 'Display_Farms',
  components: {
    Map
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
       - Test with additional aggregated farms
       - Display farm info on mouseover
       - Route to farm metrics on click
      */
      return Object.keys(this.farms).map(farm => {
        return this.farms[farm].areas.map(i => {
          if (i.name.includes("Centroid")) {
            return {
              title: this.farms[farm].name+' '+i.name,
              wkt: i.geofield[0].geom,
              color: 'orange',
              visible: true,
              weight: 0,
              canEdit: false,
            };
          }
        }).filter(x => x)
      }).flat()
    },
  },
  mounted() {

  },
  methods: {
    parseData() {
      return Object.keys(this.farms).map(farm => {
        return this.farms[farm].areas.map(i => {
          if (i.name.includes("Centroid")) {
            return 'Farm '+farm+': '+this.farms[farm].name+', Area '+i.tid+': '+i.name;
          }
        }).filter(x => x)
      }).flat()
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
