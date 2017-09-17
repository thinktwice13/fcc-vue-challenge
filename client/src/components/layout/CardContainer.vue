<template>
  <v-layout column>
    <div v-bind:class="{ 'display-3': !isMobile, 'display-1': isMobile}">{{title}}</div>
    <div class="mt-3 card-outer">
      <slot>Some Content wil go here</slot>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: "card",
  props: ["title"],
  data: () => ({
    isMobile: false
  }),
  mounted () {
    this.$vuetify.load(this.init)
  },
  beforeDestroy () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize, { passive: true })
    }
  },
  methods: {
    init () {
      this.onResize()
      window.addEventListener('resize', this.onResize, { passive: true })
    },
    onResize () {
      this.isMobile = window.innerWidth < 600
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Great+Vibes');

aside {
  background-color: orange;
}

.card-outer {
  margin-top: 16px;
  margin-bottom: 91px;
}
</style>
