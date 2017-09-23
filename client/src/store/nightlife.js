import axios from "axios"

export default {
  state: {
    venues: null
  },
  getters: {
    user(state, getters, rootState) {
      return rootState.user
    }
  },
  actions: {
    async fetchVenues({ commit }, location) {
      const items = (await axios.post("/api/nightlife/search", location)).data
        .venues.response.groups[0].items
      commit("showVenues", { location, items })
    },
    setFavorite({ commit }, { newFavs, venueId }) {
      commit("setFavs", { newFavs, venueId })
      axios.put("/api/nightlife/fav", newFavs)
    },
    setAttendance({ commit }, { toAttend, venueId }) {
      commit("setAttendance", { toAttend, venueId })
      axios.put("/api/nightlife/attend", toAttend)
    }
  },
  mutations: {
    showVenues(state, { items, location }) {
      const user = this.getters.user

      //update user with new searh preferences
      if (!user.nightlife) {
        user.nightlife = {
          search: location,
          attending: [],
          favs: [],
          date: new Date().toJSON().slice(0, 10)
        }
      } else {
        user.nightlife.search = location
      }
      state.venues = items.map(item => {
        const photo = item.venue.photos.groups[0].items[0]
        return {
          id: item.venue.id,
          title: item.venue.name,
          avatar: photo.prefix + "48x48" + photo.suffix,
          description: `${item.venue.stats.checkinsCount} Check-ins | ${item
            .venue.location.address}`,
          url: `https://www.google.com/maps/search/${item.venue.name} ${item
            .venue.location.city} ${item.venue.location.country}`,
          going: this.getters.user.nightlife.attending.includes(item.venue.id),
          fav: this.getters.user.nightlife.favs.includes(item.venue.id)
        }
      })
    },
    setFavs(state, { newFavs, venueId }) {
      this.getters.user.nightlife.favs = newFavs
      state.venues.find(
        venue => venue.id === venueId && (venue.fav = !venue.fav)
      )
    },
    setAttendance(state, { toAttend, venueId }) {
      this.getters.user.nightlife.attending = toAttend
      state.venues.find(
        venue => venue.id === venueId && (venue.going = !venue.going)
      )
    }
  }
}
