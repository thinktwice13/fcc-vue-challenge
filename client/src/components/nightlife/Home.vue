<template lang="pug">
  h1 Nightlife
</template>

<script>
import axios from "axios"

export default {
  name: "nightlifeHome",
  async mounted () {
    const res = await axios.get("/api/nighlife/" + "Lima")
    console.log(res.data)
  }
}
</script>
