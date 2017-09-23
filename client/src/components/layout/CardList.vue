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
          v-list-tile-action(v-if="action1")
            v-list-tile-action-text.hidden Fav
            v-btn(icon @click.prevent="action1Click(item.id)", v-model="item.fav")
              v-icon(:class="item.fav && 'secondary--text'") favorite
          v-list-tile-action(v-if="action2")
            v-list-tile-action-text(:class="!item.going && 'hidden'") Going
            v-switch(@click.prevent="action2Click(item.id)", v-model="item.going")
</template>

<script>
export default {
  name: "CardList",
  props: {
    action1: {
      type: Boolean
    },
    action2: {
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
    action1Click (itemId) {
      this.$emit("list-action1-click", itemId)
    },
    action2Click (itemId) {
      this.$emit("list-action2-click", itemId)
    }
  }
}
</script>

<style lang="stylus" scoped>

.list__tile__action--stack
  align-items flex-start
  justify-content center

.subheading
  font-weight 900

.hidden
  opacity 0

a,
a:visited,
a:active,
a * 
  text-decoration none
</style>
