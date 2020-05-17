<template>
  <div class="primary">
    <div>
      <div class='card'>
        <div class='card-body'>
          <h4 class='card-title'>{{ title }}</h4>
          <p
            v-for='(line, i) in this.getFarmInfo()'
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
export default {
  name: 'Display_Farms',
  components: {
  },
  data() {
    return {
      title: 'Click on a farm below to see info!',
  }},
  computed: {
    ...mapState([
      'response',
      'farms',
      'farmSelected'
    ]),
  },
  mounted() {

  },
  methods: {
    getFarmInfo() {
      if (this.farms[this.farmSelected]) {
        let farm = this.farms[this.farmSelected]
        this.title = farm.name
        return [
          'Farm '+this.farmSelected,
          farm.name
        ]
      }
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
