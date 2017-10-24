const express = require('express');
const router = express.Router();

const Couple = require('../models/Couple')
const User = require('../models/User')

router.route('/')
  .get(async (req, res) => {
    try {
      const results = await Couple.fetchAll()
      res.json(results)
    } catch (error) {
      res.json(error)
    }
  })
  .post(async (req, res) => {
    try {
      const u1 = await User.fetch(req.body.user_id_1)
      const u2 = await User.fetch(req.body.user_id_2)
      if(!u1 || !u2){
        res.json({message: 'One user doesnt exists!'})
      }
      // if both null
      if(!u1.attributes.couple_id && !u2.attributes.couple_id){
        const couple = await Couple.post()
        await User.put(req.body.user_id_1, {'couple_id': couple.attributes.id})
        await User.put(req.body.user_id_2, {'couple_id': couple.attributes.id})
        res.json(couple)
      }
      res.json({message: 'Someone already has a couple!'})
      
    } catch (error) {
      res.json(error)
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      const result = await Couple.fetch(req.params.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })
  .delete(async (req, res) => {
    try {
      const result = await Couple.delete(req.params.id)
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  })

module.exports = router;