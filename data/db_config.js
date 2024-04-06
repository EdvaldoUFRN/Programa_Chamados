//arquivo que contém os detalhes da conexão com o banco de dados.
const knex = require('knex');
const config = require("../knexfile.js");
const dbKnex = knex(config.development);

module.exports = dbKnex;