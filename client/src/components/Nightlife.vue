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
                  v-btn.secondary(@click="() => fetchVenues({phrase})", target="_blank", :disabled="!phrase") Search
                  v-btn.secondary(@click="() => fetchVenues()", target="_blank") Near me
                   v-icon(right dark) fa-map-marker
      div(v-if="!!venues", is="card-list", v-bind:list="venues", :action="isLoggedIn", @list-action-click="setAttendance")
        v-subheader Provided by FourSquare
</template>

<script>
import CardContainer from "./layout/CardContainer"
import CardList from "./layout/CardList"
import { mapState } from "vuex"

const getPosition = options => new Promise((res, rej) => {
  navigator.geolocation.getCurrentPosition(res, rej, options)
})

export default {
  name: "nighlife",
  components: { CardContainer, CardList },
  data () {
    this.venues
    return {
      title: "Nightlife Coordination",
      phrase: ""
    }
  },
  computed: mapState({
    isLoggedIn: "isLoggedIn",
    user: "user",
    venues: state => state.nightlife.venues
  }),
  watch: {
    user () {
      if (this.user.nightlife) {
        this.fetchVenues(this.user.nightlife.search)
      }
    }
  },
  created () {
    if (this.user.nightlife) {
      this.fetchVenues(this.user.nightlife.search)
    }
  },
  methods: {
    async fetchVenues (location) {
      if (!location) {
        const position = await getPosition()
        location = {
          ll: position.coords.latitude + "," + position.coords.longitude
        }
      }
      this.$store.dispatch("fetchVenues", location)
    },
    setAttendance (venueId) {
      const attending = this.user.nightlife.attending
      let toAttend = []
      if (attending.includes(venueId)) {
        toAttend = attending.filter(venue => venue !== venueId)
      } else {
        toAttend = [...attending, venueId]
      }
      this.$store.dispatch("setAttendance", { toAttend, venueId })
    }
  }
}
</script>
