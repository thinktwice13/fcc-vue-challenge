<template>
  <div v-if="loading" is="loader" />
  <v-layout v-else is="card-container" v-bind:title="title">
    <v-flex xs12 sm6 offset-sm3 lg4 offset-lg4>
      <v-card class="outer">
        <v-card-title primary-title>
          <div class="card-content">
            <blockquote>
              <div class="headline amber--text text--darken-4">{{ quote }}</div>
            </blockquote>
            <div class="subheading">- {{author}}</div>
          </div>
        </v-card-title>
        <v-card-actions class="justify-center" slot="card-actions">
          <v-btn flat class="amber--text text--darken-3" :href="tweetUrl" target="_blank">Share</v-btn>
          <v-btn flat class="amber--text text--darken-3" @click="getQuote">Next</v-btn>
        </v-card-actions>
      </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>


<script>
import axios from "axios"
import CardContainer from "./layout/CardContainer"
import Loader from "./layout/Loader"

export default {
  name: "quotes",
  components: {
    CardContainer, Loader
  },
  data () {
    return {
      title: "Quote Generator",
      loading: false,
      quote: null,
      author: null
    }
  },
  computed: {
    tweetUrl () { return "https://twitter.com/intent/tweet?text=" + this.quote + " by " + this.author }
  },
  methods: {
    async getQuote () {
      const res = await axios.get("https://random-quote-generator.herokuapp.com/api/quotes/random")
      this.quote = res.data.quote
      this.author = res.data.author
      this.loading = false
    }
  },
  mounted () {
    this.loading = true
    this.getQuote()
  }
}
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Great+Vibes");

blockquote,
div.subheading {
  margin-right: 24px;
}

blockquote {
  border-left-color: #ff6f00;
}

.headline {
  text-align: left;
  font-weight: 900;
}

.subheading {
  font-family: 'Great Vibes', cursive;
  text-align: right;
  margin: 10px 0;
}

.justify-center {
  a,
  button {
    font-weight: 700;
  }
}
</style>

