import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    userId: null,
    isLoggedIn: false
  },
  actions: {
    async fetchUser({ commit }) {
      const user = (await axios.get("/api/user")).data
      commit("setUser", user)
    }
  },
  mutations: {
    setUser(state, user) {
      this.state.userId = user._id
      this.state.isLoggedIn = user.auth
    }
  }
})
