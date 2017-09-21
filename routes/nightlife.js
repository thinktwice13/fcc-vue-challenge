const axios = require("axios")
const config = require("../config")

const fourSquareApiUrl = `https://api.foursquare.com/v2/venues/search?LOCATION&client_id=${config
  .KEYS.fourSquareClientId}&client_secret=${config.KEYS
  .fourSquareSecret}&v=20170801&m=foursquare`

module.exports = app => {
  app.post("/api/nightlife/search", async (req, res) => {
    console.log(req.body)
    locationString = ""
    if (req.body.phrase) {
      locationString = `near=${req.body.phrase}`
    } else {
      locationString = `ll=${req.body.lat},${req.body.lng}`
    }
    const requestUrl = fourSquareApiUrl.replace("LOCATION", locationString)
    const venues = await axios.get(requestUrl)
    res.send({ venues: venues.data })
  })
}
