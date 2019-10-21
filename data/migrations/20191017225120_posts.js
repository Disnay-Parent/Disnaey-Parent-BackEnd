
exports.up = function(knex) {
  return knex.schema.createTable('posts', tbl => {
      tbl.increments()
      tbl.string('username', 100).notNullable()
      tbl.string('firstName', 100).notNullable()
      tbl.string('lastName', 100).notNullable()
      tbl.string('post', 5000).notNullable()
      tbl.string('location', 200).notNullable()
      tbl.string('time', 100).notNullable()
      tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('posts')
};
