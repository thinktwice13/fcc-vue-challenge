<template lang="pug" >
  v-layout(column justify-center)
    div(is="card-container", :title="title")
      v-flex(xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4)
        v-card
          v-container
            v-layout(row nowrap)
              //- timer
              v-flex(xs12)
                v-card(flat)
                  .display-4 {{display}}
            v-divider.my-4
            //- selectors
            v-layout(row wrap)
              v-flex(d-flex xs12 sm6)
                v-layout(row wrap v-on:wheel="adjustWork" v-on:click="timePicker = !timePicker")
                  v-flex(xs6 sm12)
                    .title.mb-1.secondary--text Work
                  v-flex(xs6 sm12)
                    .display-1 {{work}}
              v-flex(d-flex xs12 sm6)
                v-layout(row wrap v-on:wheel="adjustBreak")
                  v-flex(xs6 sm12)
                    .title.mb-1.secondary--text Break
                  v-flex(xs6 sm12)
                    .display-1 {{pause}}
            v-btn.mt-4(block secondary @click="start") Start
</template>

<script>
import CardContainer from "./layout/CardContainer"

export default {
  name: "pomodoro",
  components: { CardContainer },
  data () {
    return {
      title: "Pomodoro Timer",
      display: "25:00",
      work: 25,
      pause: 5,
      time: 0,
      isWorking: false
    }
  },
  watch: {
    time () {
      // parse time imterval inot minutes and seconds
      const secs = this.time % 60
      const mins = Math.floor(this.time / 60)

      // When time interval equels time limit, switch work/break status and set timeInterval to -1
      if (this.isWorking && this.time === this.work * 60 || !this.isWorking && this.time === this.pause * 60) {
        this.time = 0
        this.isWorking = !this.isWorking
      }

      //set display
      const displayMins = ("0" + ((this.isWorking ? this.work : this.pause) - (!!secs ? 1 : 0) - mins)).slice(-2)
      const displaySecs = ("0" + (secs === 0 ? 0 : (60 - secs))).slice(-2)
      this.display = displayMins + " : " + displaySecs

    }
  },
  methods: {
    start () {
      if (!this.isWorking) {
        this.timeInterval = window.setInterval(() => this.time++, 1000)
        this.isWorking = !this.isWorking
      }
    },
    adjustWork (ev) {
      this.work = ev.wheelDelta > 0 ? this.work + 1 : this.work - 1
      if (this.work < 1) this.work = 1
    },
    adjustBreak (ev) {
      this.pause = ev.wheelDelta > 0 ? this.pause + 1 : this.pause - 1
      if (this.pause < 1) this.pause = 1
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>



