<template>
  <v-app id="app" toolbar footer>

    <!-- Sidebar -->
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

    <!-- Navbar -->
    <v-toolbar class="primary" dark fixed>
      <v-toolbar-side-icon @click.stop.prevent="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span">FCC Vue Challenge</router-link>
      </v-toolbar-title>
    </v-toolbar>

    <!--  main content -->
    <main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </main>

    <!-- Footer -->
    <v-footer class="primary">
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

<style lang="stylus">

@import url('https://fonts.googleapis.com/css?family=Lato:300,400,700,900&subset=latin-ext');
@import '../node_modules/vuetify/src/stylus/settings/_colors.styl'

$theme := {
  primary: $grey.darken-3
  accent: $grey.lighten-1
  secondary: $amber.darken-4
  info: $blue.darken-1
  warning: $yellow.darken-2
  error: $red.base
  success: $green.base
}

@import '../node_modules/vuetify/src/stylus/main.styl' 

#app {
  font-family: "Lato", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary;
}

// * {
//   outline: 2px dotted orange
// }


.toolbar__title {
  font-weight: 700;
}


main .container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1170px;
  padding: 10px
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
