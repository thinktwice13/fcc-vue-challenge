const express = require("express")
const config = require("./config")

const app = express()

require("./routes")(app)

app.listen(config.PORT, console.log("Server started"))
