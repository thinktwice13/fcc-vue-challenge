<template lang="pug">
  div(is="card-container" :title="title")
    v-flex(xs12 sm10 offset-sm1 md8 offset-md2)
      v-card
        highstock(:options="options")
      v-card
        v-container Filters here
      div.caption Data provided for free by 
        a(href="https://iextrading.com/developer", target="_blank") IEX.
</template>

<script>
import CardContainer from "./layout/CardContainer"

export default {
  name: "stock",
  components: { CardContainer },
  data () {
    return {
      title: "Stock Chart",
      options: {
        chart: {
          renderTo: 'container',
          type: 'bar'
        },
        series: [{
          showInNavigator: true,

          name: 'Jane',
          data: [1, 0, 4]
        }]
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchStocks", "aapl")
  }
}
</script>

<style lang="stylus" scoped>
a
  font-weight 700
</style>
