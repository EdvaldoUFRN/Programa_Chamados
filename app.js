const express = require('express');
const app = express();
const port = 3001;
const usuarios = require('./usuarios');

app.use(express.json());
app.use('/usuarios', usuarios); //identificação da rota e da const (require) associada.

//exemplo de middleware
const log = (req, res,next) => {
    console.log(`..............Acessado em ${new Date()}`);
    next();
}

app.get('/transfere', log, (req,res)=>{
    res.send("ok! Valor transferido com sucesso...");
});

app.listen(port, ()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
})



