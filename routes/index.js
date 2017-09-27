module.exports = app => {
  app.get("/api", (req, res) => {
    res.send({ msg: "Request successfully proxied." })
  })

  require("./auth")(app)
  require("./stocks")(app)
  require("./nightlife")(app)
}
