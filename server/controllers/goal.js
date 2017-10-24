const express = require('express');
const router = express.Router();

const Goal = require('../models/Goal')

router.route('/')
  .get(async (req, res) => {
    try {
      const results = await Goal.fetchAll()
      res.json(results)
    } catch (error) {
      res.json(error)
    }
  })
  .post(async (req, res) => {
    try {
      const result = await Goal.post(req.body)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })

router.route('/with/name/:goal_name')
  .get(async (req, res) => {
    try {
      const results = await Goal.withName(req.params.goal_name)
      res.json(results)
    } catch (error) {
      res.json(error)
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      const result = await Goal.fetch(req.params.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })
  .put(async (req, res) => {
    try {
      const result = await Goal.put(req.params.id, req.body)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await Goal.delete(req.params.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })

module.exports = router;