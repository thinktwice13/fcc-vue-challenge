<template lang="pug">
div(is="card-container", v-bind:title="title")
  v-flex(xs12 sm8 offset-sm2 md6 offset-md3)
    v-card
      v-container(fluid grid-list-lg)
        v-layout(row)
          v-flex(xs12)
            v-layout(row wrap justify-center)
              v-card(class="searchbox-wiki", flat tile)
                v-text-field(v-model="phrase", name="searchbox-wiki", label="Search Wiki", single-line)
              v-card(flat tile)
                v-flex(d-flex fill-height align-center)
                  v-btn(class="secondary", href='https://en.wikipedia.org/wiki/Special:Random', target="_blank") Random
      div(v-if="!!articles", is="card-list", v-bind:list="articles")
</template>

<script>
import axios from "axios"
import CardContainer from "./layout/CardContainer"
import CardList from "./layout/CardList"

export default {
  name: "wiki",
  components: { CardContainer, CardList },
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
      // this.articles = results.query && results.query.pages || false
      this.articles = results.query && Object.values(results.query.pages).map(article => ({ title: article.title, description: article.extract, url: article.fullurl }))
    }
  }
}
</script>

<style lang="stylus" scoped>
.searchbox-wiki {
  min-width 250px
}
</style>
