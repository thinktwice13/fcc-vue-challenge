const foursquare = require("../services/foursquare")

module.exports = app => {
  app.post("/api/nightlife/search", async (req, res) => {
    const venues = await foursquare(req.body)
    res.send({ venues: venues.data })
  })
}
