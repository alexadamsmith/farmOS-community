<template>
  <div class="primary">

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

export default {
  props: {
    data: [Object, Array, String],
    method: String,
  },
  name: 'Display_Response',
  data() {
    return {
  }},
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
          displayText.push("Farm name (farmOS server): "+this.data[farm].info.name);
          displayText.push("URL: "+this.data[farm].info.url);
          displayText.push("User: "+this.data[farm].info.user.name);
          displayText.push("ID: "+farm);
        }
      }
      if (this.method === 'farms/logs/') {
        for (const farm in this.data) {
          displayText.push("Farm ID: "+farm);
          this.data[farm].forEach(i => {
            displayText.push("Log ID: "+i.id);
            displayText.push("Log name: "+i.name);
            displayText.push("URL: "+i.url);
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
