import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import nightlife from "./nightlife"
import stocks from "./stocks"
import { saveStock, removeStock } from "../services/user"

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
        response.user.nightlife.attending = []
      }
      state.user = response.user
      state.isLoggedIn = response.auth
    },
    addStock(state, { symbol }) {
      if (state.isLoggedIn) state.user.stocks[state.user.stocks.length] = symbol
    },
    removeStock(state, symbol) {
      if (state.isLoggedIn)
        state.user.stocks = state.user.stocks.filter(stock => stock !== symbol)
    }
  },
  modules: {
    nightlife,
    stocks
  }
})
