
exports.up = function(knex) {
  return knex.schema.createTable('volunteers', tbl => {
      tbl.increments()
      tbl.float('avgPerChild')
      tbl.boolean('priceNegotiable').defaultTo(false)
      tbl.boolean('CPR_Certified').defaultTo(false)
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
  return knex.schema.dropTableIfExists('volunteers')
};
