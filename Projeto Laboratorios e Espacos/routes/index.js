//esse arquivo cuida das rotas principais: a pagina inicial (/) e o teste de saude (/saude)

const express = require("express");
const { Espaco } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //busca os 3 primeiros espacos em ordem alfabetica para mostrar nos destaques da home
    const espacos = await Espaco.findAll({
      order: [["nome", "ASC"]],
      limit: 3,
      raw: true
    });

    res.render("index", {
      titulo: "Laboratórios e Espaços",
      subtitulo: "Acompanhe informações, destaques e registros recentes.",
      espacos
    });
  } catch (erro) {
    next(erro);
  }
});

//rota de diagnostico que retorna um json pra saber se o servidor ta rodando ok
router.get("/saude", (req, res) => {
  res.json({ status: "ok", aplicacao: "laboratorios-e-espacos" });
});

module.exports = router;
