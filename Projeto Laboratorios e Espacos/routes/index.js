// importa o Express para criar e organizar as rotas
const express = require("express");

// importa o modelo Espaço, usado para consultar o banco de dados
const {Espaco} = require("../models");

// cria um roteador para definir as rotas desta parte da aplicação
const router = express.Router();

// rota principal do site
router.get("/", async (req, res, next) => {

  // busca os tres pimeiros espaços cadastrados
  // organizando os resultados em ordem alfabetica
  try {
    const espacos = await Espaco.findAll({
      order: [["nome", "ASC"]],
      limit: 3,
      raw: true
    });
  
    // renderiza a pagina inicial e envia os dados encontrados
  res.render("index", {
    titulo: "Laboratórios e Espaços",
    subtitulo: "Conheça os laboratórios e espaços do campus",
    espacos
  });
} catch (erro) {

  // encaminha qualquer erro para o tratamento de erros do Express
  next(erro);
}
});

 // rota ultilizada para verificar se a aplicação esta funcionando 
router.get("/saude", (req, res) => {

  // retorna uma resposta no formato JSON indicando que esta tudo certo
  res.json({ status: "ok"});
});

// exporta as rotas para que possam ser ultilizadas pelo app.js
module.exports = router;

// ESSE ARQUIVO CUIDA DE DUAS ROTAS:
// / - EXIBE A PAGINA INICIAL
// /saude - RETORNA UM JSN PARA VER SE TA FUNCIONANDO
