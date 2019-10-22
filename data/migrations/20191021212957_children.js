
exports.up = function(knex) {
  return knex.schema.createTable('children', tbl => {
      tbl.increments()
      tbl.string('name', 100).notNullable()
      tbl.string('DOB', 100).notNullable()
      tbl.string('alergies', 500)
      tbl.string('special_instructions', 1000)
      tbl.string('medical_conditions', 500)
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
  return knex.schema.dropTableIfExists('children')
};
