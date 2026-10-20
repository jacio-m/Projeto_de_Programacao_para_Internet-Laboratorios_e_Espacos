//esse arquivo cuida das rotas de espacos: listagem (/espacos) e detalhamento (/espacos/:id)

const express = require("express");
const { Espaco } = require("../models");

const router = express.Router();

//rota para listar todos os espacos em ordem alfabetica pelo nome
router.get("/", async (req, res, next) => {
  try {
    const espacos = await Espaco.findAll({
      order: [["nome", "ASC"]],
      raw: true
    });

    res.render("espacos/listar", {
      titulo: "Espaços cadastrados",
      descricao: "Confira os laboratórios, auditórios e espaços disponíveis no campus.",
      espacos,
      possuiEspacos: espacos.length > 0, //verifica se tem pelo menos 1 espaco para o #if da view
      quantidade: espacos.length
    });
  } catch (erro) {
    next(erro);
  }
});

//rota para mostrar os detalhes de um espaco especifico pelo id
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    //valida se o id passado na url é um numero inteiro positivo (ex: bloqueia /espacos/abc)
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(404).render("404", {
        titulo: "Espaço não encontrado",
        caminho: `/espacos/${req.params.id}`
      });
    }

    const espaco = await Espaco.findByPk(id, { raw: true });

    //se o numero for valido mas nao existir no banco (ex: /espacos/99999), retorna 404
    if (!espaco) {
      return res.status(404).render("404", {
        titulo: "Espaço não encontrado",
        caminho: `/espacos/${id}`
      });
    }

    return res.render("espacos/detalhar", {
      titulo: espaco.nome,
      espaco
    });
  } catch (erro) {
    return next(erro);
  }
});

module.exports = router;
