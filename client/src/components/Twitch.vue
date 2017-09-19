<template lang="pug">
  div(v-if="loading", is="loader")
  div(v-else is="card-container" v-bind:title="title")
    v-flex(xs12 sm8 offset-sm2 md6 offset-md3)
      v-card
        v-container(fluid grid-list-lg)
          v-layout(row)
            v-flex(xs12)

</template>

<script>
import axios from "axios"
import Loader from "./layout/Loader"
import CardContainer from "./layout/CardContainer"
//stramers list provided by projects user stories
const streamerList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

export default {
  name: "twitch",
  components: { Loader, CardContainer },
  data () {
    return {
      loading: false,
      title: "Twitch TV",
      streamers: []
    }
  },
  async mounted () {
    streamerList.forEach(async (streamer, i) => {
      this.streamers[i] = (await axios.get("https://wind-bow.glitch.me/twitch-api/streams/" + streamer)).data
    })
  }
}

</script>