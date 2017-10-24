'use strict';

const knex = require('../config/knex.js')
const bookshelf = require('bookshelf')(knex);

const model = bookshelf.Model.extend({
  tableName: 'goals',
  hasTimestamps: true
})

const Goal = {
  fetchAll: () => {
    return model.fetchAll()
  },
  fetch: (id) => {
    return model.where('id', id).fetch()
  },
  post: (data) => {
    return model.forge({
      name: data.name,
      image: data.image,
    })
    .save()
  },
  put: (id, data) => {
    return model.where('id', id).save(data, {patch: true})
  },
  delete: (id) => {
    return model.where('id', id).destroy()
  },
  withName: (name) => {
    return model.query(function(qb){
      qb.whereRaw('lower(name) LIKE ?', [`%${name}%`])
    }).fetchAll()
  }
}

module.exports = Goal