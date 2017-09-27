import { getStock } from "../services/stocks"
import { saveStock } from "../services/user"

export default {
  state: {
    loading: false,
    stock: []
  },
  actions: {
    async fetchStock({ commit }, phrase) {
      //TODO check if stock exists
      const symbol = phrase
      commit("loading", true)
      const stock = await getStock(symbol)
      saveStock(symbol)
      commit("loading", false)
      console.log(stock)
    }
  },
  mutations: {
    loading(state, status) {
      this.state.loading = status
    }
  }
}
