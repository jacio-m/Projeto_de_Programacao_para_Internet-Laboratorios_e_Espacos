// importa o express para criar as rotas
const express = require("express");

// importa o modelo Espaço para acessar os dados do banco
const { Espaco } = require("../models");

// cria um roteador para organizar as rotas desde arquivo
const router = express.Router();

// define a rota responsavel por listar todos os espaços
router.get("/", async (req, res, next) => {
  
  // Busca os espaços cadastrados no banco de dados
  // organizando os resultados em ordem alfabética pelo nome
  try {
    const espacos = await Espaco.findAll({
  order: [["nome", "ASC"]],
  raw: true
});

    // renderiza a pagina de listagem e envia os dados encontrados
    res.render("espacos/listar", {
      titulo: "Laboratórios e Espaços",
      espacos,

      // verifica se existe pelo menos um espaço cadastrado
      possuiEspacos: espacos.length > 0,

      // informa a quantidade de espaços encontrados
      quantidade: espacos.length
    });
  } catch (erro) {

    // encaminha qualquer erro para o tratamento de erros do Express
    next(erro);
  }
});

 // define a rota que exibe os detalhes de um espaço pelo ID
router.get("/:id", async (req, res, next) => {

  // converte o ID recebido pela URL em um numero
  try {
    const id = Number(req.params.id);

    // verifica se o ID é um numero inteiro positivo
    if (!Number.isInteger(id) || id<= 0) {

      // retorna a pagina 404 se o ID for inválido
      return res.status(404).render("404", {
        titulo: "Espaço não encontrado",
        caminho: `/espacos/${req.params.id}`
      });
    }

    // busca no banco de dados o espaço correspondente ao ID
    const espaco = await Espaco.findByPk(id, { raw: true});

    // verifia se o espaço existe
    if(!espaco) {

      // retorna a pagina 404 se o espaço não for encontrado
      return res.status(404).render("404", {
        titulo: "Espaço não encontrado",
        caminho: `/espacos/${id}`
      });
    }

    // renderiza a pagina com os detalhes do espaço encontrado
    return res.render("espacos/detalhar", {
      titulo: espaco.nome,
      espaco
    });
  } catch (erro) {

    // encaminha erros para o tratamento de erros 
    return next(erro);
  }
});

// exporta o roteador para que o app.js possa ultilizar essas rotas
module.exports = router;
