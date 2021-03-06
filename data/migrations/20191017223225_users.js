
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
      tbl.increments()
      tbl.string('username', 50).notNullable().unique()
      tbl.string('password', 50).notNullable()
      tbl.string('firstName', 100).notNullable()
      tbl.string('lastName', 100).notNullable()
      tbl.string('email', 100).notNullable().unique()
      tbl.date('DOB').notNullable()
      tbl.string('phoneNum', 100).notNullable()
      tbl.string('type', 100).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
};
