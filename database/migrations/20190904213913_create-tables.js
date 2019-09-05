exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
      tbl.increments();
      tbl.string('username', 36).notNullable().unique();
      tbl.string('password', 36).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  