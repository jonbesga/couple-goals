const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config/config')

module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, async (req, email, password, done) => {

  const u = await User.withEmail(email.trim().toLowerCase())
  
  if(u){
    const equalPasswords = u.comparePassword(password.trim())
    if(equalPasswords){
      const payload = {
        sub: u.attributes.id
      };
      const token = jwt.sign(payload, config.JWT_SECRET);
      const data = {
        id: u.attributes.id,
        name: u.attributes.name
      };

      return done(null, token, data);
    }
  }
  const errors = {}
  errors.summary = 'Invalid credentials'
  errors.email = ''
  errors.password = ''
  return done(errors);
});