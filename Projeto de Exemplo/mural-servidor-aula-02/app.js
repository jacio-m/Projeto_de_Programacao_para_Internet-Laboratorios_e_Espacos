const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { sequelize, Publicacao } = require("./models");
const indexRouter = require("./routes/index");
const publicacoesRouter = require("./routes/publicacoes");

function createApp() {
  const app = express();

  app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "main",
      layoutsDir: path.join(__dirname, "views", "layouts"),
      partialsDir: path.join(__dirname, "views", "partials"),
      helpers: {
        formatarData(valor) {
          return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short"
          }).format(new Date(valor));
        }
      }
    })
  );

  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "views"));

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/", indexRouter);
  app.use("/publicacoes", publicacoesRouter);

  app.use((req, res) => {
    res.status(404).render("404", {
      titulo: "Página não encontrada",
      caminho: req.originalUrl
    });
  });

  app.use((erro, req, res, next) => {
    console.error("Erro tratado pela aplicação:", erro);

    if (res.headersSent) {
      return next(erro);
    }

    return res.status(500).render("erro", {
      titulo: "Erro interno",
      mensagem:
        process.env.NODE_ENV === "development"
          ? erro.message
          : "Não foi possível concluir a solicitação. Tente novamente."
    });
  });

  return app;
}

async function prepararBanco() {
  await sequelize.authenticate();
  await sequelize.sync();

  const quantidade = await Publicacao.count();
  if (quantidade === 0) {
    await Publicacao.bulkCreate([
      {
        titulo: "Como uma rota funciona?",
        conteudo:
          "Uma rota associa um endereço da aplicação a uma função executada pelo servidor.",
        autor: "Ana Souza",
        categoria: "Express"
      },
      {
        titulo: "Para que serve o Handlebars?",
        conteudo:
          "O Handlebars combina um template HTML com os dados enviados pela rota.",
        autor: "Bruno Lima",
        categoria: "Handlebars"
      },
      {
        titulo: "O que o findAll retorna?",
        conteudo:
          "O método findAll consulta os registros de um modelo e devolve uma coleção.",
        autor: "Carla Mendes",
        categoria: "Sequelize"
      },
      {
        titulo: "Por que utilizamos await?",
        conteudo:
          "O await permite aguardar a conclusão de uma operação assíncrona antes de continuar.",
        autor: "Diego Santos",
        categoria: "JavaScript"
      },
      {
        titulo: "De onde vem o HTML final?",
        conteudo:
          "O servidor renderiza a view e envia ao navegador uma resposta HTML pronta.",
        autor: "Eduarda Alves",
        categoria: "Servidor"
      },
      {
        titulo: "Qual é o papel do modelo?",
        conteudo:
          "O modelo representa no JavaScript a estrutura das informações persistidas no banco.",
        autor: "Felipe Rocha",
        categoria: "Sequelize"
      }
    ]);
  }
}

module.exports = { createApp, prepararBanco };
