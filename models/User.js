const mongoose = require("mongoose")

module.exports = mongoose.model(
  "users",
  new mongoose.Schema({
    email: String,
    googleId: String,
    nighlife: [
      {
        venueId: String,
        going: {
          type: Boolean,
          default: false
        },
        dateGoing: {
          type: Date,
          default: Date.now
        }
      }
    ]
  })
)
