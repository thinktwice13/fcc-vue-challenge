const mongoose = require("mongoose")
const Schema = mongoose.Schema

module.exports = mongoose.model(
  "users",
  new Schema({
    email: String,
    googleId: String,
    nightlife: {
      search: Schema.Types.Mixed,
      date: String,
      attending: [String],
      favs: [String]
    }
  })
)
