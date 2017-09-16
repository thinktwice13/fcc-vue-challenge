import Vue from "vue"
import Router from "vue-router"
import Hello from "@/components/Hello"
import Quotes from "@/components/Quotes"

Vue.use(Router)

export default new Router({
  // mode: history,
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
    }
  ]
})
