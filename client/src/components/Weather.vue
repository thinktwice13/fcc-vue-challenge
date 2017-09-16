<template>
  <div is="card" v-bind:title="title">
    <v-container fluid grid-list-md slot="card-content" class="subheading">
      <v-layout row>
        <v-flex d-flex xs12>
          <v-layout column>
            <v-flex d-flex>
              <v-card flat tile>
                <v-card-title primary-title class="pb-1">
                  <div class="display-1 mb-0 amber--text text--darken-4">{{location}}</div>
                </v-card-title>
                <v-card-text class="subheading text-xs-left pt-0">{{desc}}</v-card-text>
              </v-card>
            </v-flex>

            <v-layout row wrap>

              <v-flex d-flex xs12 sm6>
                <v-card tile flat @click="toggleUnit">
                  <v-btn flat class="display-4">{{unitC? tempC : tempF}}
                    <span>° {{unitC? "C" : "F"}}</span>
                  </v-btn>
                </v-card>
              </v-flex>
              <v-flex d-flex xs12 sm6>
                <v-card tile flat>
                  <v-card-text><img class="cover" :src="icon"> </v-card-text>
                </v-card>
              </v-flex>

              <v-flex d-flex xs12 sm6>

                <v-layout column>
                  <v-flex d-flex>
                    <v-card tile flat>
                      <v-card-text>MIN
                        <span>{{unitC? temp_minC : temp_minF}}
                        </span>
                      </v-card-text>
                      <v-card-text>MAX
                        <span>{{unitC? temp_maxC : temp_maxF}}
                        </span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>

              <v-flex d-flex xs12 sm6>
                <v-layout column>
                  <v-flex d-flex>
                    <v-card tile flat>
                      <v-card-text>PRESSURE
                        <span>{{press}}
                        </span>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex d-flex>
                    <v-card tile flat>
                      <v-card-text>HUMIDITY
                        <span>{{hum}}
                        </span>
                        %</v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>

            </v-layout>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

  </div>
</template>

<script>
import axios from "axios"
import Card from "./layout/Card"

export default {
  name: "weather",
  components: {
    Card
  },
  data () {
    return {
      title: "Local weather",
      unitC: true,
      location: null,
      desc: null,
      tempC: null,
      temp_minC: null,
      temp_maxC: null,
      tempF: null,
      temp_minF: null,
      temp_maxF: null,
      hum: null,
      press: null,
      icon: null
    }
  },
  methods: {
    toggleUnit () {
      this.unitC = !this.unitC
    }
  },
  async mounted () {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const CtoF = temp => temp * 9 / 5 + 32
      const weather = (await axios.get(`https://fcc-weather-api.glitch.me/api/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)).data
      this.location = weather.name
      const desc = weather.weather["0"].description
      this.desc = desc.charAt(0).toUpperCase() + desc.slice(1)
      this.hum = weather.main.humidity
      this.press = weather.main.pressure
      this.icon = weather.weather["0"].icon
      this.tempC = Math.round(weather.main.temp)
      this.temp_minC = Math.round(weather.main.temp_min)
      this.temp_maxC = Math.round(weather.main.temp_max)
      this.tempF = Math.round(CtoF(weather.main.temp))
      this.temp_minF = Math.round(CtoF(weather.main.temp_min))
      this.temp_maxF = Math.round(CtoF(weather.main.temp_max))
    })
  }
}
</script>

<style lang="scss" scoped>
.cover {
  object-fit: cover;
  width: 75%;
  height: 75%;
}


.display-1 {
  font-weight: 700;
}


.display-4 {
  font-weight: 500;
  height: 100%;
  span {
    font-size: 36px;
    bottom: 0;
  }
}

.card__text span {
  font-weight: 900;
}
</style>

