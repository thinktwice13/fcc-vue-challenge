<template lang="pug">
  div(is="card-container" :title="title")
    v-flex(xs12 sm10 offset-sm1 md8 offset-md2)
      v-card
        highstock(:options="options")
        v-container(v-if="user")
          v-chip(v-for="(chip, index) in user.stocks" @input="() => removeStock(chip)" close) {{chip}}
        v-container
          v-layout(row wrap justify-center)
            v-card(class="searchbox-stock", flat tile)
              v-text-field(v-model="phrase" 
                name="searchbox-stock"
                label="Enter Stock Symbol"
                @keyup.enter="addStock"
                single-line)
            v-card(flat tile)
              v-flex(d-flex fill-height align-center)
                v-btn(class="secondary", 
                type="submit", 
                @click.prevent="addStock", 
                :disabled="!phrase",
                :loading="loading") Add
      div.caption Data provided for free by 
        a(href="https://iextrading.com/developer", target="_blank") IEX.
</template>

<script>
import CardContainer from "./layout/CardContainer"
import { mapState } from "vuex"

export default {
  name: "stocks",
  components: { CardContainer },
  data () {
    return {
      title: "Stock Chart",
      phrase: "",
      options: {
        chart: {
          renderTo: 'card',
          type: 'ohlc'
        },
        series: [{
          showInNavigator: true,
          name: 'Jane',
          data: [1, 0, 4]
        }]
      }
    }
  },
  computed: mapState({
    user: "user",
    loading: "loading"
  }),
  methods: {
    addStock () {
      if (!this.phrase) return
      this.$store.dispatch("addStock", this.phrase)
    },
    removeStock (symbol) {
      this.$store.dispatch("removeStock", symbol)
    }
  }
}
</script>

<style lang="stylus" scoped>
a
  font-weight 700
</style>
