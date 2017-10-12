import {
  getStock,
  socketSubscribe,
  socketUnsubscribe
} from "../services/stocks"
import { saveStock, removeStock } from "../services/user"

export default {
  state: {
    loading: false,
    options: {
      series: null,
      rangeSelector: {
        selected: 2
      },
      title: {
        text: "Stock Prices"
      }
    }
  },
  actions: {
    async fetchStocks({ commit, rootState }) {
      if (rootState.user.stocks.length > 0) {
        commit("loading", true)
        const data = await getStock(rootState.user.stocks)
        if (data) {
          commit("showStocks", data)
          socketSubscribe(rootState.user.stocks)
        }
        commit("loading", false)
      }
    },
    async addStock({ commit, rootState }, phrase) {
      const symbol = phrase
      if (!rootState.isLoggedIn || !rootState.user.stocks.includes(symbol)) {
        commit("loading", true)
        const data = await getStock([symbol])
        // save stock if chart data found
        if (data) {
          rootState.isLoggedIn && saveStock(symbol)
          commit("addStock", { symbol, data }, { root: true })
          socketSubscribe(symbol)
        }
        commit("loading", false)
      }
    },
    async removeStock({ commit, rootState }, symbol) {
      commit("loading", true)
      rootState.isLoggedIn && removeStock(symbol)
      socketUnsubscribe(symbol)
      commit("removeStock", symbol, { root: true })
      commit("loading", false)
    }
  },
  mutations: {
    loading(state, status) {
      this.state.loading = status
    },
    addStock(state, { symbol, data }) {
      const stock = {
        type: "ohlc",
        name: symbol,
        data: data[symbol].chart.map(d => [
          Date.parse(d.date),
          d.open,
          d.high,
          d.low,
          d.close
        ]),
        dataGrouping: {
          units: [
            [
              "week", // unit name
              [1] // allowed multiples
            ],
            ["month", [1, 2, 3, 4, 6]]
          ]
        }
      }

      if (!state.options.series) {
        state.options.series = [stock]
      } else {
        state.options.series.push(stock)
      }
    },
    removeStock(state, symbol) {
      const index = state.options.series.findIndex(stock => {
        stock.name === symbol
      })
      state.options.series.splice(index, 1)
    },
    showStocks(state, stocks) {
      state.options.series = Object.keys(stocks).map(sym => {
        return {
          type: "ohlc",
          name: sym,
          data: stocks[sym].chart.map(d => [
            Date.parse(d.date),
            d.open,
            d.high,
            d.low,
            d.close
          ]),
          dataGrouping: {
            units: [
              [
                "week", // unit name
                [1] // allowed multiples
              ],
              ["month", [1, 2, 3, 4, 6]]
            ]
          }
        }
      })
    }
  }
}
