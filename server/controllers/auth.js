const express = require('express');
const router = express.Router();
const validator = require('validator');
const passport = require('passport')

const User = require('../models/User')

const validateSignUpForm = async (payload) => {
  const errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }
  else{
    const existsWithEmail = await User.withEmail(payload.email)
    if(existsWithEmail){
      isFormValid = false
      errors.email = 'This email is already registered.'
    }
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  return {
    success: isFormValid,
    errors
  };
}

const validateLoginForm = async (payload) => {
  const errors = {};
  let isFormValid = true;

  const existsWithEmail = await User.withEmail(payload.email)
  if(existsWithEmail){
    isFormValid = false
    errors.email = 'This email is already registered.'
  }

  return {
    success: isFormValid,
    errors
  };
}

router.route('/register')
  .post(async (req, res, next) => {
    const validationResult = await validateSignUpForm(req.body)
    
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        errors: validationResult.errors
      });
    }

    return passport.authenticate('local-signup', (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err
        });
      }

      return res.status(200).json({
        success: true
      });
    })(req, res, next);
  })

router.route('/login')
  .post(async (req, res, next) => {
    // const validationResult = await validateLoginForm(req.body)
    if(!req.body.email || !req.body.password){
      const errors = {}
      errors.summary = ''
      errors.email = req.body.email ? '' : 'No email provided'
      errors.password = req.body.password ? '' : 'No password provided'
      return res.status(401).json({
        success: false,
        errors,
      });
    }
    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        console.log(err)
        return res.status(401).json({
          success: false,
          errors: err
        });
      }
  
      return res.json({
        success: true,
        token,
        user: userData
      });
    })(req, res, next);
  })

module.exports = router;