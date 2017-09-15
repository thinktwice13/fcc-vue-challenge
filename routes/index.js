module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ msg: "After-deployment test!" })
  })

  app.get("/api", (req, res) => {
    res.send({ msg: "Request successfully proxied!! YAY" })
  })
}
