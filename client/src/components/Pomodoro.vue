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
              v-flex(d-flex xs12 sm6 align-center)
                  v-flex.adjustBtn(xs3 d-flex)
                    v-btn(icon, :disabled="!isPaused", @click="workDown")
                      v-icon remove
                  v-layout(row wrap v-on:wheel="adjustWork")
                    v-flex(d-flex align-center xs6 sm12)
                      .title.mb-1.secondary--text Work
                    v-flex(xs6 sm12)
                      .display-1 {{work}}
                  v-flex.adjustBtn(xs3 d-flex)
                    v-btn(icon, :disabled="!isPaused", @click="workUp")
                      v-icon add
              v-flex(d-flex xs12 sm6 align-center)
                v-flex.adjustBtn(xs3 d-flex)
                    v-btn(icon, :disabled="!isPaused", @click="pauseDown")
                      v-icon remove
                v-layout(row wrap v-on:wheel="adjustBreak")
                  v-flex(d-flex align-center xs6 sm12)
                    .title.mb-1.secondary--text Break
                  v-flex(xs6 sm12)
                    .display-1 {{pause}}
                v-flex.adjustBtn(xs3 d-flex)
                  v-btn(icon, :disabled="!isPaused", @click="pauseUp")
                    v-icon add
            v-btn.mt-4(block :class="!isWorking ? 'success' : 'secondary'" @click="flow") {{isPaused ? "Start" : "Pause"}}
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
      isWorking: true,
      isPaused: true
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
      const displayMins = ("0" + ((this.isWorking ? this.work : this.pause) - (secs ? 1 : 0) - mins)).slice(-2)
      const displaySecs = ("0" + (secs === 0 ? 0 : (60 - secs))).slice(-2)
      this.display = displayMins + ":" + displaySecs
    },
    work (val) {
      this.work = val < 1 ? 1 : val
    },
    pause (val) {
      this.pause = val < 1 ? 1 : val
    }
  },
  methods: {
    adjustWork (ev) { if (this.isPaused) this.work = ev.wheelDelta > 0 ? this.work + 1 : this.work - 1 },
    adjustBreak (ev) { if (this.isPaused) this.pause = ev.wheelDelta > 0 ? this.pause + 1 : this.pause - 1 },
    workUp () { this.work++ },
    workDown () { this.work-- },
    pauseUp () { this.pause++ },
    pauseDown () { this.pause-- },
    flow () {
      if (this.isPaused) {
        this.timeInterval = window.setInterval(() => this.time++, 1000)
      }
      else {
        window.clearInterval(this.timeInterval)
      }
      this.isPaused = !this.isPaused
    }
  }
}
</script>

<style lang="stylus" scoped>
.adjustBtn
  margin 0
</style>



