<template lang="pug">
  v-layout(column justify-center)
    div(is="card-container", v-bind:title="title")
      v-flex(xs12 sm8 offset-sm2 md4 offset-md4)
        v-card.elevation-24.simon
          v-layout(row wrap)
            v-flex.field.green(xs6, v-on:click.prevent.stop="test")
            v-flex.field.red(xs6, v-on:click="test")
            v-flex.field.yellow(xs6, v-on:click="test")
            v-flex.field.blue(xs6, v-on:click="test")
            v-card.controls(flat)
</template>


<script>
import CardContainer from "./layout/CardContainer"

export default {
  name: "simon",
  components: { CardContainer },
  data () {
    return {
      title: "Simon Game"
    }
  },
  methods: {
    test (ev) {
      console.log(ev)
    }
  }
}
</script>


<style lang="stylus" scoped>
border = 16px solid #424242

.simon
  position relative
  border-radius 50%
  border border

.controls
  position absolute
  width calc(40% + 32px)
  padding-top 40%
  top calc(30% - 16px)
  left calc(30% - 16px)
  border-radius 50%
  border border

.settings
  position absolute


.field
  // height 0
  padding-top 50%
  &.green
    border-top-left-radius 100%
  &.red
    border-top-right-radius 100%
  &.green
    border-top-left-radius 100%
  &.yellow
    border-bottom-left-radius 100%
  &.blue
    border-bottom-right-radius 100%
  &:hover
    background-color rgba(255,255,255,0.2) !important

</style>
