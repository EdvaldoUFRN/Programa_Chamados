// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/usuarios.db3'
    },
    useNullAsDefault:true,
    migrations: {
      directory:'./data/migrations'
      //cada arquivo desse contém a definição da estrutura de cada tabela da aplicação
      //e as modificações que ocorrem ao longo do desenvolvimento.
      //ou seja ao rodar os arquivos migrtations, as tabelas serão criadas.
      //npx knex migrate:make create_usuarios
      //também é útil para desfazer uma modificação na estrutura de alguma tabela do sistema.
  
    },
    seeds: {
      directory: './data/seeds'
    }
  },
}