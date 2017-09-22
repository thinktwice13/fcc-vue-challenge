const foursquare = require("../services/foursquare")
const User = require("../models/User")

module.exports = app => {
  app.post("/api/nightlife/search", async (req, res) => {
    const venues = await foursquare(req.body)
    res.send({ venues })

    if (req.user) {
      User.update(
        { _id: req.user._id },
        {
          $set: {
            "nightlife.search": req.body,
            "nightlife.date": new Date().toJSON().slice(0, 10)
          }
        },
        err => {
          if (err) console.log(err)
        }
      )
    }
  })

  app.put("/api/nightlife/attend", async (req, res) => {
    User.update(
      { _id: req.user._id },
      {
        $set: {
          "nightlife.attending": req.body
        }
      },
      err => {
        if (err) console.log(err)
        else res.send({})
      }
    )
  })
}
