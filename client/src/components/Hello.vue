<template>
  <v-layout column justify-center class="hello">
    <h1 class="secondary--text">FCC Vue Challenge</h1>
    <h4 class="secondary--text">
      <a :href="url" target="_blank">
        <v-icon large class="secondary--text">fa-github</v-icon>
      </a>
      <i>thinktwice13
      </i>
    </h4>
  </v-layout>
</template>

<script>
export default {
  name: "hello",
  data () {
    return {
      url: "https://github.com/thinktwice13/fcc-vue-challenge"
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1,
h2 {
  font-family: "Lato";
  font-weight: 900;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

i {
  font-style: normal;
}

a {
  // color: #42b983;
  text-decoration: none;
  margin-right: 15px;
}
</style>
