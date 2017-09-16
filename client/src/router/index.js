import Vue from "vue"
import Router from "vue-router"
import Hello from "@/components/Hello"
import Quotes from "@/components/Quotes"
import Weather from "@/components/Weather"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Hello",
      component: Hello
    },
    {
      path: "/quotes",
      name: "Quotes",
      component: Quotes
    },
    {
      path: "/weather",
      name: "weather",
      component: Weather
    }
  ]
})
