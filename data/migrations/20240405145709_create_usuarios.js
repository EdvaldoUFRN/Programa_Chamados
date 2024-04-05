/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  //Os números iniciar estão relacionados a data de criação.
  return knex.schema.createTable("usuarios", (table) => {
    table.increments();
    table.string("user", 80).notNullable();
    table.string("senha").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("usuarios");
};

//caso queira usar o up, você precisa jogar no terminal : knex migrate:latest
//caso queira usar o down, você precisa usar o knex migrate:rollback