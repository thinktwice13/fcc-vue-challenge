module.exports = app => {
  app.get("/api", (req, res) => {
    res.send({ msg: "Request successfully proxied." })
  })

  require("./nightlife")(app)
  require("./auth")(app)
}
