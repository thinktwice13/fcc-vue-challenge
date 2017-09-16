const express = require("express")
const config = require("./config")
const serveStatic = require("serve-static")

const app = express()
app.use(serveStatic(__dirname + "/client/dist"))

require("./routes")(app)

app.listen(config.PORT, console.log("Server started"))
