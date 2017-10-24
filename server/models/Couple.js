'use strict';

const knex = require('../config/knex.js')
const bookshelf = require('bookshelf')(knex);

const userModel = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
})

const model = bookshelf.Model.extend({
  tableName: 'couples',
  hasTimestamps: true,
  users: function() {
    return this.hasMany(userModel);
  }
})

module.exports = {
  model: model,

  fetchAll: () => {
    return model.fetchAll({
      columns: ['id', 'created_at', 'updated_at'],
      withRelated: ['users']
    })
  },
  fetch: (id) => {
    return model.where('id', id).fetch({
      columns: ['id', 'created_at', 'updated_at'],
      withRelated: ['users']
    })
  },
  post: () => {
    return model.forge({}).save()
  },
  delete: (id) => {
    return model.where('id', id).destroy()
  }
}