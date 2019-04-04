exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("username", 128)
      .notNullable()
      .unique();
    table.string("password", 100).notNullable();
    table.string("department", 40).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
