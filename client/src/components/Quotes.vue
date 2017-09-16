<template>
  <v-flex xs12 sm6 offset-sm3 class="flex-col-center">
    <div class="display-3">{{title}}</div>
    <v-card>
      <v-card-title primary-title>
        <div class="card-content">
          <!-- <h3 class="headline mb-0">Kangaroo Valley Safari</h3> -->
          <blockquote>
            <div class="headline amber--text text--darken-4">{{ quote }}</div>
          </blockquote>
          <div class="subheading">- {{author}}</div>
        </div>
      </v-card-title>
      <v-card-actions class="justify-center">
        <v-btn flat class="amber--text text--darken-3" :href="tweetUrl" target="_blank">Share</v-btn>
        <v-btn flat class="amber--text text--darken-3" @click="getQuote">Next</v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import axios from "axios"
export default {
  name: "quotes",
  data () {
    return {
      title: "Quote Generator",
      loading: false,
      quote: " ",
      author: " "
    }
  },
  computed: {
    tweetUrl () { return "https://twitter.com/intent/tweet?text=" + this.quote + " by " + this.author }
  },
  methods: {
    async getQuote () {
      this.loading = true
      const res = await axios.get("https://random-quote-generator.herokuapp.com/api/quotes/random")
      this.quote = res.data.quote
      this.author = res.data.author
      this.loading = false
    }
  },
  mounted () {
    this.getQuote()
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Great+Vibes');

.card {
  margin: 10px 0 85px 0;
}

.card-content {
  width: 100%;
  blockquote,
  .subheading {
    padding-right: 24px;
    margin: 15px 0;
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
  }
}

.justify-center {
  a,
  button {
    font-weight: 700;
  }
}
</style>

