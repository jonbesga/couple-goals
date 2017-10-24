const User = require('../models/User')
const PassportLocalStrategy = require('passport-local').Strategy;

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  

  const userCreated = User.post({
    name: req.body.name.trim(),
    email: email.trim().toLowerCase(),
    password: password.trim()
  })
  
  return done(null);
});