import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import nightlife from "./nightlife"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    loading: false,
    user: null,
    isLoggedIn: false
  },
  actions: {
    async fetchUser({ commit }) {
      const response = (await axios.get("/api/user")).data
      commit("setUser", response)
    }
  },
  mutations: {
    setUser(state, response) {
      //resset attending venues if today is after last recorded data
      const today = new Date().toJSON().slice(0, 10)
      if (response.auth && today > response.user.nightlife.date) {
        response.nightlife.attending = []
      }
      state.user = response.user
      state.isLoggedIn = response.auth
    }
  },
  modules: {
    nightlife
  }
})
