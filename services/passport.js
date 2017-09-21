const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20")
const config = require("../config")
const mongoose = require("mongoose")
const User = require("../models/User")

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((userId, done) => {
  User.findById(userId).then(user => done(null, user))
})

passport.use(
  new GoogleStrategy(
    {
      clientID: config.KEYS.googleClientId,
      clientSecret: config.KEYS.googleSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user exists
      User.findOne({ googleId: profile.id }).then(user => {
        user
          ? done(null, user)
          : new User({ googleId: profile.id })
              .save()
              .then(user => done(null.user))
      })
    }
  )
)
