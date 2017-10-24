const express = require('express');
const router = express.Router();

const User = require('../models/User')

const authCheckMiddleware = require('../middleware/auth-check');

router.route('/')
  .get(async (req, res) => {
    try {
      const results = await User.fetchAll()
      res.json(results)
    } catch (error) {
      res.json(error)
    }
  })
  .post(async (req, res) => {
    try {
      const result = await User.post(req.body)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })

router.route('/:id(\\d+)')
  .get(async (req, res) => {
    try {
      const result = await User.fetch(req.params.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })
  .put(async (req, res) => {
    try {
      const result = await User.put(req.params.id, req.body)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await User.delete(req.params.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })

router.route('/me')
  .get(authCheckMiddleware,async (req, res) => {
    try {
      const result = await User.fetch(req.user.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })
module.exports = router;