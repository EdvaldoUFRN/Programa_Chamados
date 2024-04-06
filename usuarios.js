const express = require("express"); //pacotes a serem utilizados
const bcrypt = require('bcrypt');
const router = express.Router();
const cors = require("cors");
router.use(cors());

const dbKnex = require("./data/db_config") //dados de conexão com o banco de dados.

//método get é usado para consulta.
router.get("/", async (req, res) => {
    try {
        //para obter os usuarios pode-se utilizar .select().orderBy() ou apenas .orderBy()
        const usuarios = await dbKnex("usuarios").orderBy("id", "desc");
        res.status(200).json(usuarios); // retorna statusCode ok e os dados.
    } catch (error) {
        res.status(400).json({ msg: error.message }); //retorna status de erro e msg.
    }
});

router.post('/', async (req, res) => {
    const { user, senha } = req.body;
    //faz a desestruturação dos dados recebidos no corpo da requisição.
    //Insira o usuário e senha no banco de dados
    try {
        const hashedPassword = await hashPassword(senha);
        const novo = await dbKnex('usuarios').insert({ user, senha: hashedPassword });
        res.status(201).json({ id: novo[0] });
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        res.status(500).send('Erro ao registrar usuário');
    }
});

//método put é usado para alteração. id indica o registro a ser alterado.
//esses dois pontos antes, significa que deve ser passado um parâmetro.
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { senha } = req.body;
    const hashedPassword = await hashPassword(senha);
    try {
        //altera o campo senha, no registro cujo id coincidir com o parâmetro passado
        await dbKnex("usuarios").update({ senha: hashedPassword }).where("id", id); // ou .where ({id})
        res.status(200).json();
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

//método delete é usado para exclusão
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await dbKnex("usuarios").del().where("id", id);
        res.status(200).json();
    } catch (error) {
        res.status(400).json({ msg: error.mensage });
    }
});

//Operador like do sql, com o uso de caracteres curingas, verifica
//se a palavra existe em qualquer lugar da string.
//nas consultas sql não há diferenciação entre maisculas.


//filtro por user
router.get("/filtro/:palavra", async (req, res) => {
    const { palavra } = req.params; //a palavra que vai ser usada para a pesquisa.
    try {
        //para filtrar registros, utiliza-se .where(), com suas variantes.
        const usuarios = await dbKnex("usuarios")
            .where("user", "like", `%${palavra}%`);
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ msg: error.mensage });
    }

})

//Servidores web impedem que requisições HTTP de scripts que estejam
//rodando em uma origem diferente - de plataforma, domínio ou porta
//possam ter acesso aos recursos da aplicação nativa.
//podemos liberar o acesso a partir de outras origens.
//vai pro prompt e adicione o pacote CORS.
//ele é comumente usado para permitir que acessem os recursos da API.
//útil quando está desenvolvendo uma API RESTful
//No entanto, é importante ter cuidado ao usar o CORS e garantir que você esteja
//configurando-o corretamente para evitar a exposição de dados confidenciais 
//ou vulnerabilidades de segurança em sua API. Você pode especificar opções de 
//configuração adicionais para o CORS, como quais origens específicas são 
//permitidas ou quais cabeçalhos de solicitação são permitidos, 
//conforme necessário para atender aos requisitos de segurança da sua aplicação.
//Em resumo, as APIs são ferramentas poderosas que permitem a integração de sistemas,
//o compartilhamento de dados e a automação de processos, 
//facilitando a criação de aplicativos mais complexos e robustos.
module.exports = router;



//função para gerar um hash seguro da senha usando bcrypt
async function hashPassword(password) {
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
//vou instalar um pacote que faz a criptografia das senhas.
//assim ao enviar a senha por meio do form, ele irá pegar a senha.
//e criptografar antes de colocá-la no banco de dados.
//npm install bcrypt
