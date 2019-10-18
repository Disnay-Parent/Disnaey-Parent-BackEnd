
exports.up = function(knex) {
  return knex.schema.createTable('posts', tbl => {
      tbl.increments()
      tbl.string('userName', 100).notNullable()
      tbl.string('userLastname', 100).notNullable()
      tbl.string('post', 5000).notNullable()
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
