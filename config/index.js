//create ./dev.js if it doesn't exist

module.exports = {
  PORT: process.env.PORT || 3003,
  KEYS:
    process.env.NODE_ENV === "production" ? require("./prod") : require("./dev")
}
