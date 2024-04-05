const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const app = express();
const port = 3001;

app.get('/', (req,res) => {
    res.send('Olá..Bem vindo!');
});

//exemplo de middleware
const log = (req, res,next) => {
    console.log(`..............Acessado em ${new Date()}`);
    next();
}
app.get('/cap12', (req,res)=>{
    res.send('<h2>Capítulo 12: Introdução ao Express </h2>');
});

app.use(express.json());

app.post('/filmes', (req,res)=>{
    const {titulo, genero} = req.body;
    res.send(`Filme:${titulo} - Gênero: ${genero}, recebido...`);
})

//rota para lidar com a submissão do formulário
app.post('/registro', async (req,res)=>{
    const {user, senha} = req.body;

    //Insira o usuário e senha no banco de dados
    try {
        const hashedPassword = await hashPassword(senha);
        await db('usuarios').insert({ user, senha: hashedPassword });
        res.status(201).send('Usuário registrado com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).send('Erro ao registrar usuário');
    }
});

app.get('/transfere', log, (req,res)=>{
    res.send("ok! Valor transferido com sucesso...");
});

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})

//vou instalar um pacote que faz a criptografia das senhas.
//assim ao enviar a senha por meio do form, ele irá pegar a senha.
//e criptografar antes de colocá-la no banco de dados.
//npm install bcrypt


//função para gerar um hash seguro da senha usando bcrypt
async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}


/*Em bcrypt, o custo de processamento é controlado pelo valor do fator de trabalho. 
Quanto maior o valor, mais seguro é o hash gerado, pois torna mais demorado e custoso para um atacante realizar um ataque de força bruta ou de dicionário para tentar quebrar as senhas.
O valor padrão do fator de trabalho no bcrypt é 10. Porém, este valor pode ser ajustado conforme necessário com base nos requisitos de segurança do seu aplicativo e
na carga do servidor. Aumentar o custo do processo de hashing tornará as senhas mais seguras, mas também exigirá mais recursos computacionais.

Então, o 10 que você vê no código indica que o algoritmo de hashing bcrypt deve usar um custo de processamento de 10, 
o que é um valor comummente aceito para garantir uma boa segurança, mas ainda mantendo uma boa performance.
*/