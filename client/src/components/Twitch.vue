<template lang="pug">
  div(v-if="loading", is="loader")
  div(v-else is="card-container" v-bind:title="title")
    v-flex(xs12 sm8 offset-sm2 md6 offset-md3)
      v-card
        div(v-if="!!streamers.length", is="card-list", v-bind:list="streamers")
</template>

<script>
import axios from "axios"
import Loader from "./layout/Loader"
import CardContainer from "./layout/CardContainer"
import CardList from "./layout/CardList"
//stramers list provided by projects user stories
const streamerList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]
const apiUrl = "https://wind-bow.glitch.me/twitch-api/streams/"

export default {
  name: "twitch",
  components: { Loader, CardContainer, CardList },
  data () {
    return {
      loading: false,
      title: "Twitch TV",
      streamers: []
    }
  },
  async mounted () {
    this.loading = true
    const promises = streamerList.map(streamer => axios.get(apiUrl + streamer))
    return axios.all(promises)
      .then(res => {
        console.log(res)
        this.streamers = res.map(({ data }, index) => ({
          url: "https://www.twitch.tv/" + streamerList[index],
          title: streamerList[index],
          description: (data.stream ? ("Currently streaming: " + data.stream.game + " | " + data.stream.channel.status) : ("Offline"))
        }))
        this.loading = false
      })
  }
}

</script>
