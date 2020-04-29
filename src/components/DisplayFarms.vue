<template>
  <div class="primary">
    <div>

    <p>Displaying centroids</p>
    <Map
      id="map"
      :overrideStyles="{ height: '60vw' }"
      :drawing="false"
      :options="{
        controls: (defs) => defs.filter(def => def.constructor.name !== 'FullScreen')
      }"
      :wkt="mapLayers" />

      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Farm names:</h4>
          <p
            v-for="(line, i) in this.parseData()"
            v-bind:key="i">
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
  props: {
  //  data: [Object, Array, String],
  //  method: String,
  },
  name: 'Display_Farms',
  components: {
    Map
  },
  data() {
    return {
  }},
  computed: {
    // get specified values from state using implicit getters
    ...mapState([
      'response',
      'farms',
    ]),
    mapLayers() {
      /*
       TODO:
       - Add each centroid as a separate layer and zoom to LAYERS
      */

      // eslint-disable-next-line
      let centroid = null;
      for (const farm in this.farms) {
        this.farms[farm].areas.forEach(i => {
          if (i.name === "Centroid") {
            centroid = i.geofield[0].geom
          }
        })
      }

      const farmCenters = {
        title: 'Farm Centers',
        wkt: centroid,
        color: 'orange',
        visible: true,
        weight: 0,
        canEdit: false,
      };
      return [farmCenters];
    },
  },
  mounted() {

  },
  methods: {
    parseData() {
      let displayText = [];
      for (const farm in this.farms) {
        displayText.push("Farm name: "+this.farms[farm].name);
        displayText.push("Farm ID: "+farm);
        this.farms[farm].areas.forEach(i => {
          displayText.push("Area ID: "+i.tid);
          displayText.push("Area name: "+i.name);
        });
      }
      return displayText
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
