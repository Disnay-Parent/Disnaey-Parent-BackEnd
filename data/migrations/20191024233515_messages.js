
exports.up = function(knex) {
  return knex.schema.createTable('messages', tbl => {
      tbl.increments()
      tbl.string('username', 100).notNullable()
      tbl.string('firstName', 100).notNullable()
      tbl.string('lastName', 100).notNullable()
      tbl.string('message', 100).notnullable()
      tbl.integer('post_id').notNullable()
      tbl.integer('user_id').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages')
};
