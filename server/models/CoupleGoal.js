'use strict';

const knex = require('../config/knex.js')
const bookshelf = require('bookshelf')(knex);

const model = bookshelf.Model.extend({
  tableName: 'couplegoals',
  hasTimestamps: true
})

module.exports = {
  fetchAll: () => {
    return model.fetchAll()
  },
  fetchAllFrom: (coupleId) => {
    return model.where('couple_id', coupleId).fetchAll()
  },
  fetch: (id) => {
    return model.where('id', id).fetch()
  },
  post: (data) => {
    return model.forge({
      name: data.name,
      image : data.image,
      user_id: data.user_id,
      couple_id: data.couple_id,
      goal_id: data.goal_id
    })
    .save()
  },
  put: (id, data) => {
    return model.where('id', id).save(data, {patch: true})
  },
  delete: (id) => {
    return model.where('id', id).destroy()
  }
}