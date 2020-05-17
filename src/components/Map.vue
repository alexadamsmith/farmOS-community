<template>
  <div
    :id="id"
    :style="[defaultStyles, overrideStyles]">
  </div>
  <!-- :style="[defaultStyles, overrideStyles]"> -->
</template>

<script>
import { mapState } from 'vuex';

export default {

  name: 'Map',
  data() {
    return {
      map: {},
      layers: {
        wkt: null,
        mapbox: null,
      },
      // these can be overridden by the 'overrideStyles' prop
      defaultStyles: {
        height: '100vw',
      },
    };
  },
  props: {
    id: String,
    overrideStyles: Object,
    drawing: Boolean,
    options: {
      type: Object,
      controls: [Boolean, Array, Function],
      interactions: [Boolean, Array, Function],
      units: String,
      default() {
        return {
          controls: true,
          interactions: true,
          units: 'us',
        };
      },
    },
    wkt: {
      type: Array,
      validator: wktArray => wktArray.every(e => typeof e.title === 'string'
          && (typeof e.wkt === 'string' || !e.wkt)
          && typeof e.color === 'string'
          && (!e.visible || typeof e.visible === 'boolean')
          && typeof e.weight === 'number'
          && typeof e.canEdit === 'boolean'),
          // && typeof e.params === 'object'),
          // && typeof e.id === 'number'),
          // && typeof e.attribution === 'string'),
    },
  },
  computed: mapState({
    farms: state => state.farms,
    mapboxAPIKey: state => state.mapboxAPIKey,
  }),
  mounted() {
    this.map = window.farmOS.map.create(this.id, this.options);
    console.log(this.map); // eslint-disable-line no-console

    //let hasLayers = false; // eslint-disable-line no-unused-vars
    // De-weights layers without geometries
    /*
    const layerWeights = this.wkt.map(e => (e.wkt
      && e.wkt !== 'GEOMETRYCOLLECTION EMPTY'
      ? e.weight : 99));
      */
    this.wkt.forEach((wktElement) => {
      // Zoom to the layer if it has the lowest weight
      if (wktElement.wkt
        && wktElement.wkt !== 'GEOMETRYCOLLECTION EMPTY') {
          // TODO:
          // Set a layer property to farm ID
        this.layers[wktElement.title] = this.map.addLayer('wkt', wktElement);
        /*
        if (wktElement.weight === Math.min(...layerWeights)) {
          this.map.zoomToLayer(this.layers[wktElement.title]);
        }
        */
        //hasLayers = true;
      }
    });
    this.map.zoomToVectors();

    // TODO:
    // Add link in popup to farm info view
    var popup = this.map.addPopup(event => { // eslint-disable-line no-unused-vars
      var mapLayer = this.map.map.forEachFeatureAtPixel(event.pixel, function(feature, layer) { return layer; }); // eslint-disable-line no-unused-vars
      console.log(mapLayer.getProperties()); // eslint-disable-line no-console
      var farm = this.farms[mapLayer.getProperties().title];
      // console.log(layer); // eslint-disable-line no-console
      this.$store.commit('updateFarmSelected', mapLayer.getProperties().title);
      return '<div><h2>Farm</h2><p>' + farm.name + '</p></div>';
    })
    /*
    popup.on('farmOS-map.popup', function (event) { // eslint-disable-line no-unused-vars
      console.log(event.target.content.innerText); // eslint-disable-line no-console
    });
    */

    if (this.mapboxAPIKey) {
      const mapboxOpts = {
        title: 'MapBox Satellite',
        url: `https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=${this.mapboxAPIKey}`,
        group: 'Base layers',
        base: true,
        visible: true,
      };
      this.layers.mapbox = this.map.addLayer('xyz', mapboxOpts);
    }
  },

  beforeDestroy() {
    window.farmOS.map.destroy(this.id);
    this.map = null;
  },
  watch: {
    wkt: {
      handler(newWKT) {
        // TODO: Figure out why this is triggering twice when a new area is added.
        //let hasLayers = false;
        // Preferentially weights layers with geometries
        /*
        const layerWeights = newWKT.map(e => (e.wkt
          && e.wkt !== 'GEOMETRYCOLLECTION EMPTY'
          ? e.weight : 99));
          */
        newWKT.forEach((newElement) => {
          // Zoom to the layer if it has the lowest weight
          if (this.layers[newElement.title]) {
            this.map.map.removeLayer(this.layers[newElement.title]);
            this.layers[newElement.title] = null;
          }
          if (newElement.wkt
          && newElement.wkt !== 'GEOMETRYCOLLECTION EMPTY') {
            this.layers[newElement.title] = this.map.addLayer('wkt', newElement);
            /*
            if (newElement.weight === Math.min(...layerWeights)) {
              this.map.zoomToVectors();
              //this.map.zoomToLayer(this.layers[newElement.title]);
              hasLayers = true;
            }
            */
          }
        });
        //if (!hasLayers) {
          this.map.zoomToVectors();
        //}
      },
      deep: true,
    },
  },

};

</script>

<style>

</style>
