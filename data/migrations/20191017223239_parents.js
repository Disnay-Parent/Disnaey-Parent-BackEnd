
exports.up = function(knex) {
  return knex.schema.createTable('parents', tbl => {
      tbl.increments()
      tbl.string('emergencyPhone', 100).notNullable()
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
  return knex.schema.dropTableIfExists('parents')
};
