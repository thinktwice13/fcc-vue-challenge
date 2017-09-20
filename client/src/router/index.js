import Vue from "vue"
import Router from "vue-router"
import Hello from "@/components/Hello"
import Quotes from "@/components/Quotes"
import Weather from "@/components/Weather"
import Wiki from "@/components/Wiki"
import Twitch from "@/components/Twitch"
import Pomodoro from "@/components/Pomodoro"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "hello",
      component: Hello
    },
    {
      path: "/quotes",
      name: "quotes",
      component: Quotes
    },
    {
      path: "/weather",
      name: "Wweather",
      component: Weather
    },
    {
      path: "/wiki",
      name: "wiki",
      component: Wiki
    },
    {
      path: "/twitch",
      name: "twitch",
      component: Twitch
    },
    {
      path: "/pomodoro",
      name: "pomodoro",
      component: Pomodoro
    }
  ]
})
