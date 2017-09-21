<template lang="pug">
div(is="card-container", v-bind:title="title")
  v-flex(xs12 sm8 offset-sm2 md6 offset-md3)
    v-card
      v-container(fluid grid-list-lg)
        v-layout(row)
          v-flex(xs12)
            v-layout(row wrap justify-center)
              v-card(class="searchbox-wiki", flat tile)
                v-text-field(v-model="phrase", name="searchbox-hightlife", label="Search Venues", single-line, @keyup.enter="fetchVenues({phrase})")
              v-card(flat tile)
                v-flex(d-flex fill-height align-center)
                  v-btn.secondary(@click="fetchVenues({phrase})", target="_blank") Search
                  v-btn.secondary(@click="() => fetchVenues()", target="_blank") Near me
                   v-icon(right dark) fa-map-marker
        v-subheader(v-if="venues") Provided by FourSquare
      div(v-if="!!venues", is="card-list", v-bind:list="venues")
</template>

<script>
import axios from "axios"
import CardContainer from "../layout/CardContainer"
import CardList from "../layout/CardList"

const request = async location => await axios.post("/api/nightlife/search", location)

const getPosition = options => new Promise((res, rej) => {
  navigator.geolocation.getCurrentPosition(res, rej, options)
})

export default {
  name: "nightlifeHome",
  components: { CardContainer, CardList },
  data () {
    return {
      title: "Nightlife Coordination",
      phrase: "",
      venues: null
    }
  },
  methods: {
    async fetchVenues (location) {
      console.log("Fetching")
      if (!location) {
        const position = await getPosition()
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }
      const venues = (await request(location)).data.venues.response.venues
      this.venues = venues.map(venue => ({
        title: venue.name,
        description: `${venue.stats.checkinsCount} Check-ins | ${venue.location.formattedAddress.join(", ")}`,
        url: `https://www.google.com/maps/search/${venue.name} ${this.phrase}`
      }))
    }
  }
}
</script>
