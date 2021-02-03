const express = require('express');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User')

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('Trying to check user: ' + username + ' with password ' + password)
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      console.log('Found the user', user)
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('Returning user from authenticate check!')
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    console.log('Serializing user id into cookie ', user._id)
    done(null, user._id);
});
  
passport.deserializeUser(function(id, done) {
    console.log('Deserialing user from id in cookie ', id)
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

const router = express.Router();
router.post('/login', passport.authenticate('local'), (req, res) => {
  let user = req.user
  res.send({_id: user._id, username: user.username })
})

module.exports = {
    passport,
    router
}