<template>
  <div class="primary">
    <div v-if="this.method === 'farms/areas/'">
    <p>Displaying centroids</p>
    <Map
      id="map"
      :overrideStyles="{ height: '60vw' }"
      :drawing="false"
      :options="{
        controls: (defs) => defs.filter(def => def.constructor.name !== 'FullScreen')
      }"
      :wkt="mapLayers" />
    </div>
    <div
      class="card"
      v-if="this.$store.state.response !== ''">
      <div class="card-body">
        <h4 class="card-title">Test request returned:</h4>
        <p
          v-for="(line, i) in this.parseData()"
          v-bind:key="i">
          {{ line }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map';
export default {
  props: {
    data: [Object, Array, String],
    method: String,
  },
  name: 'Display_Response',
  components: {
    Map
  },
  data() {
    return {
  }},
  computed: {
    mapLayers() {
      // eslint-disable-next-line
      let centroid = null;
      for (const farm in this.data) {
        this.data[farm].forEach(i => {
          // eslint-disable-next-line
          console.log(i);
          if (i.name === "Centroid") {
            centroid = i.geofield[0].geom
          }
        })
      }

      const farms = {
        title: 'farms',
        wkt: centroid,
        color: 'orange',
        visible: true,
        weight: 0,
        canEdit: false,
      };
      return [farms];
    },
  },
  methods: {
    parseData() {
      let displayText = [];
      if (this.method === 'users/') {
        this.data.forEach(i => {
          displayText.push("Email: "+i.email);
          displayText.push("Name: "+i.full_name);
          displayText.push("ID: "+i.id);
        });
      }
      if (this.method === 'farms/') {
        this.data.forEach(i => {
          displayText.push("Farm name (aggregator): "+i.farm_name);
          displayText.push("URL: "+i.url);
          displayText.push("ID: "+i.id);
        });
      }
      if (this.method === 'farms/info/') {
        for (const farm in this.data) {
          displayText.push("Farm name (server): "+this.data[farm].name);
          displayText.push("URL: "+this.data[farm].url);
          displayText.push("API Version: "+this.data[farm].api_version);
          displayText.push("ID: "+farm);
        }
      }
      if (this.method === 'farms/areas/') {
        for (const farm in this.data) {
          displayText.push("Farm ID: "+farm);
          this.data[farm].forEach(i => {
            displayText.push("Area ID: "+i.tid);
            displayText.push("Area name: "+i.name);
          });
        }
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
