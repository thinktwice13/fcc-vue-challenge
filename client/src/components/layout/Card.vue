<template>
  <v-flex xs12 sm6 class="flex-col-center">
    <div class="display-3">{{title}}</div>
    <v-card class="mt-3 card-outer">
      <slot name="card-content"></slot>
      <slot name="card-actions"></slot>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "quotes",
  props: ["title"]
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Great+Vibes');

.card-outer {
  margin-bottom: 85px;
  max-width: 400px;
}

.card-content {
  width: 100%;
}
</style>

