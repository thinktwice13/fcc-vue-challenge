// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import Vuetify from "vuetify"
import App from "./App"
import router from "./router"
import { sync } from "vuex-router-sync"
import store from "./store"
import VueHighcharts from "vue-highcharts"
import Highcharts from "highcharts/highstock"

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueHighcharts, { Highcharts })
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: { App }
})
