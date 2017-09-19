<template lang="pug">
v-layout(column justify-center, is="card-container", v-bind:title="title")
  v-flex(xs12 sm6 offset-sm3)
    v-card(elevation-20)
      v-container(fluid grid-list-lg)
        v-layout(row)
          v-flex(xs12)
            v-layout(row wrap justify-center)
              v-card(class="searchbox-wiki", flat tile)
                v-text-field(v-model="phrase", name="searchbox-wiki", label="Search Wiki", single-line)
              v-card(flat tile)
                v-flex(d-flex fill-height align-center)
                  v-btn(class="secondary", href='https://en.wikipedia.org/wiki/Special:Random', target="_blank")
                    | Random
      
      v-list(v-if="!!articles" three-line, transition="slide-y-transition")
        div(v-for="(article, key) in articles", :key="key")
          v-divider
          v-list-tile(@click="")
            a(v-bind:href="article.fullurl", target="_blank")
              v-list-tile-content
                  v-list-tile-title(class="subheading") {{article.title}}
                  v-list-tile-sub-title {{article.extract}}
</template>

<script>
import axios from "axios"
import CardContainer from "./layout/CardContainer"

export default {
  name: "wiki",
  components: { CardContainer },
  data () {
    return {
      title: "Wiki Viewer",
      phrase: "",
      articles: null
    }
  },
  watch: {
    async phrase (phrase) {
      const results = (await axios.get(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&prop=extracts|info&inprop=url&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${phrase}`)).data
      console.log(results)
      this.articles = results.query && results.query.pages || false
    }
  },
  methods: {
    async getArticles () {
      const results = (await axios.get(`https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&prop=extracts|info&inprop=url&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=zagreb`)).data
      console.log(results)
      this.articles = results.query && results.query.pages || false
    }
  }
}
</script>

<style lang="stylus" scoped>

.searchbox-wiki {
  min-width 250px
}

.subheading
  font-weight 900

a,
a:visited,
a:active,
a * 
  text-decoration none

</style>
