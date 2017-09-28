<template lang="pug">
  v-layout(justify-center align-center)
    div.pa-5.display-2 {{msg}}
</template>

<script>
export default {
  props: {
    msg: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>


