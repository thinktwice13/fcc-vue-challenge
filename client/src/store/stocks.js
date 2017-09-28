import { getStock } from "../services/stocks"
import { saveStock, removeStock } from "../services/user"

export default {
  state: {
    loading: false,
    stocks: []
  },
  actions: {
    async addStock({ commit, rootState }, phrase) {
      const symbol = phrase
      if (!rootState.user.stocks.includes(symbol)) {
        commit("loading", true)
        await getStock(symbol)
        saveStock(symbol)
        commit("addStock", symbol, { root: true })
        commit("loading", false)
      }
    },
    async removeStock({ commit }, symbol) {
      commit("loading", true)
      removeStock(symbol)
      commit("removeStock", symbol, { root: true })
      commit("loading", false)
    }
  },
  mutations: {
    loading(state, status) {
      this.state.loading = status
    }
  }
}
