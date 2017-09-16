<template>
  <v-app id="app" toolbar footer>
    <v-navigation-drawer persistent v-model="drawer" light enable-resize-watcher absolute>
      <v-list>
        <v-list-tile to="/">
          <v-list-tile-content>
            <div class="title">Home</div>
          </v-list-tile-content>
        </v-list-tile>

        <div v-for="(val, key) in apps" :key="key">
          <v-list-tile :to="key.toLowerCase()">
            <v-list-tile-content>
              <v-list-tile-title>
                <div class="title">{{val}}</div>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="grey darken-3" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span">FCC Vue Challenge</router-link>
      </v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container class="flex-col-center">
        <router-view></router-view>
        <!--v-router-->
      </v-container>
    </main>
    <v-footer class="grey darken-3">
      <span class="white--text">© 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { apps } from "./utils/constants.js"
export default {
  name: "app",
  data () {
    return {
      apps,
      drawer: false
    }
  },
  mounted () {
    this.drawer = false
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900&subset=latin-ext');

#app {
  font-family: "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}


.toolbar__title {
  font-weight: 700;
}


.flex-col-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-weight: 700;
  text-transform: uppercase;
}

a,
a:visited,
a:active,
a * {
  color: #ff6f00;
}
</style>
