<template lang="pug">
  v-list.pt-0(three-line, transition="slide-y-transition")
    slot
    div(v-for="item in list", :key="item.title")
      v-divider
      a(v-bind:href="item.url", target="_blank")
        v-list-tile(@click="")
          v-list-tile-avatar.pt-0(v-if="item.avatar")
            img(v-bind:src="item.avatar")
          v-list-tile-content
            v-list-tile-title.subheading {{item.title}}
            v-list-tile-sub-title {{item.description}}
          v-list-tile-action(v-if="action")
            v-list-tile-action-text {{item.going ? "Going": "Not going"}}
            v-switch(@click.prevent="actionClick(item.id)", v-model="item.going")
</template>

<script>
export default {
  name: "CardList",
  props: {
    action: {
      type: Boolean
    },
    list: {
      type: Array,
      required: true,
      validator: list => {
        return list ? true : list[0].hasOwnProperty("url") && list[0].hasOwnProperty("title") && list[0].hasOwnProperty("description")
      }
    }
  },
  methods: {
    actionClick (itemId) {
      this.$emit("list-action-click", itemId)
    }
  }
}
</script>

<style lang="stylus" scoped>

.list__tile__action--stack
  align-items flex-start

.subheading
  font-weight 900

a,
a:visited,
a:active,
a * 
  text-decoration none
</style>
