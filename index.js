const express = require("express")
const config = require("./config")
const serveStatic = require("serve-static")
const body = require("body-parser")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
require("./services/passport")

const app = express()

mongoose.connect(config.KEYS.MONGO_URL, { useMongoClient: true })

app.use(body.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [config.KEYS.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

//must be after cookieSession and passport initialization
require("./routes")(app)

if (process.env.NODE_ENV === "production") {
  app.use(serveStatic(__dirname + "/client/dist"))
}

app.listen(config.PORT, console.log("Server started"))
