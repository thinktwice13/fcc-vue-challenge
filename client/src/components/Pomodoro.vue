<template lang="pug">
  v-layout(column justify-center)
    div(is="card-container", :title="title")
      v-flex(xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4)
        v-card
          v-container
            v-layout(row wrap)
              //- timer
              v-flex(xs12)
                v-card(flat)
                  .display-4 {{time}}
              //- selectors
            v-divider.my-4
            v-layout(row wrap)
              v-flex(d-flex xs12 sm6)
                v-layout(row wrap)
                  v-flex(xs6 sm12)
                    .title.mb-1.secondary--text Work
                  v-flex(xs6 sm12)
                    .display-1 {{work}}
              v-flex(d-flex xs12 sm6)
                v-layout(row wrap)
                  v-flex(xs6 sm12)
                    .title.mb-1.secondary--text Break
                  v-flex(xs6 sm12)
                    .display-1 {{pause}}
            v-btn.mt-4(block secondary) Start

               
</template>


<script>
import CardContainer from "./layout/CardContainer"

export default {
  name: "pomodoro",
  components: { CardContainer },
  data () {
    return {
      title: "Pomodoro Timer",
      time: "25:00",
      work: 25,
      pause: 5
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>



