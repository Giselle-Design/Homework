// The 'up' function is what is run when we 'migrate:latest'
exports.up = function (knex) {

  return knex.schema.createTable("cohorts", (table) => {

    table.increments("id").primary();
    table.string("title");
    table.string("members");
    table.string("imageUrl");


  });
};


exports.down = function (knex) {
  return knex.schema.dropTable("cohorts");
};
