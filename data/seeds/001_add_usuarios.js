/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

//npx knex seed:make 001_add_usuarios
//É usado para inserir dados nas tabelas.
exports.seed = function(knex){
  return knex("usuarios").del()
    .then(function () {
      return knex("usuarios").insert([
        {
          user: "Edvaldo", senha: "teste"
        },
        {
          user: "Mauricio", senha:"testa232"
        }
      ]);
    });
}