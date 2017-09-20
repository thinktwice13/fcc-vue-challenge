const axios = require("axios")
const config = require("../config")

const fourSquareApiUrl = `https://api.foursquare.com/v2/venues/search?near=LOCATION&client_id=${config
  .KEYS.fourSquareClientId}&client_secret=${config.KEYS
  .fourSquareSecret}&v=20170801&m=foursquare`

module.exports = app => {
  app.get("/api/nightlife/:location", async (req, res) => {
    const location = req.params.location
    const requestUrl = fourSquareApiUrl.replace("LOCATION", location)
    const venues = await axios.get(requestUrl)
    res.send({ venues: venues.data })
  })
}
