module.exports = app => {
  app.get("/", (req, res) => {
    res.send({ msg: "Hello world!" })
  })

  app.get("/api", (req, res) => {
    res.send({ msg: "Request successfully proxied!! YAY" })
  })
}
