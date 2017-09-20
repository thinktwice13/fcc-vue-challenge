const axios = require("axios")
const config = require("../config")

const fourSquareApiUrl = "api.foursquare.com/v2/venues/search?near="

const clientId = (module.exports = app => {
  app.get("/api/nightlife/:location", (req, res) => {
    const location = req.params.location

    console.log("Looking for venues near", location)
    res.send({ msg: "Looking for venues" })
  })
})
