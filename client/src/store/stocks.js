import { getStock } from "../services/stocks"
import { saveStock, removeStock } from "../services/user"

export default {
  state: {
    loading: false,
    options: {
      series: [],
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
        }
        commit("loading", false)
      }
    },
    async addStock({ commit, rootState }, phrase) {
      const symbol = phrase
      if (!rootState.user.stocks.includes(symbol)) {
        commit("loading", true)
        const data = await getStock([symbol])
        // save stock if chart data found
        if (data) {
          saveStock(symbol)
          commit("addStock", { symbol, data }, { root: true })
        }
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
    },
    addStock(state, { symbol, data }) {
      console.log(data)
      state.options.series.push({
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
      })
    },
    removeStock(state, symbol) {
      console.log(symbol)
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
