'use strict';

const knex = require('../config/knex.js')
const bookshelf = require('bookshelf')(knex);

const bcrypt = require('bcryptjs');

const model = bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  comparePassword: function(password){
    return bcrypt.compareSync(password, this.attributes.password);    
  }
})

module.exports = {
  model: model,

  fetchAll: () => {
    return model.fetchAll()
  },
  fetch: (id) => {
    return model.where('id', id).fetch()
  },
  post: (data) => {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(data.password, salt)

    return model.forge({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    })
    .save()
  },
  put: (id, data) => {
    return model.where('id', id).save(data, {patch: true})
  },
  delete: (id) => {
    return model.where('id', id).destroy()
  },
  withEmail: (email) => {
    return model.where('email', email).fetch()
  }

}