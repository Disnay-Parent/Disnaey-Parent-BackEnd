
exports.up = function(knex) {
  return knex.schema.createTable('comments', tbl => {
    tbl.increments()
    tbl.string('username').notNullable()
    tbl.string('firstName', 100).notNullable()
    tbl.string('lastName', 100).notNullable()
    tbl.string('comment', 5000).notNullable()
    tbl.integer('post_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('posts')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    tbl.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('comments')
};
