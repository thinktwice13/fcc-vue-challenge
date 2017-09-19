<template lang="pug">
  v-list.pt-0(three-line, transition="slide-y-transition")
    div(v-for="item in list", :key="item.title")
      v-divider
      a(v-bind:href="item.url", target="_blank")
        v-list-tile(@click="")
          v-list-tile-content
              v-list-tile-title(class="subheading") {{item.title}}
              v-list-tile-sub-title {{item.description}}
</template>

<script>
export default {
  name: "CardList",
  props: {
    list: {
      type: Array,
      required: true,
      validator: list => {
        console.log(list)
        return list ? true : list[0].hasOwnProperty("url") && list[0].hasOwnProperty("title") && list[0].hasOwnProperty("description")
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.subheading
  font-weight 900

a,
a:visited,
a:active,
a * 
  text-decoration none
</style>
