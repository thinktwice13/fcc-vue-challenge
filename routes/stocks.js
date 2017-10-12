const User = require("../models/User")

module.exports = app => {
  app.patch("/api/stocks/:type", (req, res) => {
    if (req.params.type === "on") {
      User.update(
        { _id: req.user._id },
        { $push: { stocks: req.body.symbol } },
        err => {
          if (err) console.log(err)
          else res.send({})
        }
      )
    } else {
      User.update(
        { _id: req.user._id },
        { $pull: { stocks: req.body.symbol } },
        err => {
          if (err) console.log(err)
          else res.send({})
        }
      )
    }
  })
}

