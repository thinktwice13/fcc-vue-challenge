const express = require("express")
const config = require("./config")

const app = express()

require("./routes")(app)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  //if route not recognized, serve index.html
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  })
}

app.listen(config.PORT, console.log("Server started"))
