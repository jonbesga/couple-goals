const config = require('./config/config')

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: config.DATABASE_HOST,
      database: config.DATABASE_NAME,
      user: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
