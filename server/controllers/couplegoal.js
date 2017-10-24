const express = require('express');
const router = express.Router();

const CoupleGoal = require('../models/CoupleGoal')
const Goal = require('../models/Goal')
const User = require('../models/User')

const authCheckMiddleware = require('../middleware/auth-check');

router.route('/')
  .get(async (req, res) => {
    try {
      const results = await CoupleGoal.fetchAll()
      res.json(results)
    } catch (error) {
      res.json(error)
    }
  })
  .post(async (req, res) => {
    try {
      const u = await User.fetch(req.body.user_id)
      if(!u.attributes.couple_id){
        res.json({message: 'User is not in a couple!'})
      }
      const newGoal = await Goal.post({
        name: req.body.name,
        image: req.body.image,
      })

      const result = await CoupleGoal.post({
        name: newGoal.attributes.name,
        image: newGoal.attributes.image,
        user_id: u.attributes.id,
        couple_id: u.attributes.couple_id,
        goal_id: newGoal.attributes.id
      })
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    
    try {
      const result = await CoupleGoal.fetch(req.params.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })
  .put(async (req, res) => {
    try {
      const result = await CoupleGoal.put(req.params.id, req.body)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await CoupleGoal.delete(req.params.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })

router.route('/from/:couple_id(\\d+)/')
  .get(async (req, res) => {
    try {
      const results = await CoupleGoal.fetchAllFrom(req.params.couple_id)
      res.json(results)
    } catch (error) {
      res.json(error)
    }
  })

router.route('/from/me')
  .get(authCheckMiddleware, async (req, res) => {
    try {
      const results = await CoupleGoal.fetchAllFrom(req.user.id)
      res.json(results)
    } catch (error) {
      res.json(error)
    }
  })


module.exports = router;