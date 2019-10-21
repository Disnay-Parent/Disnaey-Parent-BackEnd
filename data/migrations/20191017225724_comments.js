
exports.up = function(knex) {
  return knex.schema.createTable('comments', tbl => {
    tbl.increments()
    tbl.string('username').notNullable()
    tbl.string('name', 100).notNullable()
    tbl.string('lastname', 100).notNullable()
    tbl.string('comment', 5000).notNullable()
    tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('posts')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments')
};
