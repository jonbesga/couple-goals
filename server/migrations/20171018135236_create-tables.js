
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('couples', function (table) {
    table.increments();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  })
  .createTable('users', function (table) {
    table.increments();
    table.text('name').notNullable();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.integer('couple_id').unsigned().references('id').inTable('couples').onDelete('SET NULL')
  })
  .createTable('goals', function (table) {
    table.increments();
    table.text('name').notNullable();
    table.text('image').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  })
  .createTable('couplegoals', function (table) {
    table.increments();
    table.text('name').notNullable();
    table.text('image').notNullable();
    table.boolean('visibility').notNullable().defaultTo(false);
    table.boolean('force_visibility').notNullable().defaultTo(false);
    table.enu('status', ['incompleted', 'partial', 'completed']).notNullable().defaultTo('incompleted');
    table.integer('couple_id').unsigned().notNullable().references('id').inTable('couples').onDelete('SET NULL')
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('SET NULL')
    table.integer('goal_id').unsigned().notNullable().references('id').inTable('goals').onDelete('SET NULL')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('couplegoals')
  .dropTable('users')
  .dropTable('couples')
  .dropTable('goals')
};
