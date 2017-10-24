const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');


module.exports = (req, res, next) => {

  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  
  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, config.JWT_SECRET, async (err, decoded) => {

    if (err) { return res.status(401).end(); }
    
    const id = decoded.sub;
    
    const u = await User.fetch(id)
    if (!u) {
      return res.status(401).end();
    }
    req.user = {
      id
    }

    return next();
  });
};