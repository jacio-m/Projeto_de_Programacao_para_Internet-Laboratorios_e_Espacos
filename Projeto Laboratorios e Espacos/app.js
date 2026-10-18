//esse codigo roda assim que o servidor liga

const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { sequelize, Espaco } = require("./models"); //requisitando espaco dos models
const indexRouter = require("./routes/index");
const publicacoesRouter = require("./routes/espacos");

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
  await sequelize.authenticate(); //aqui ele verifica se o arquivo da pra acessar
  await sequelize.sync(); //aqui ele vai ver o arquivo models/espaco.js, se nao tiver a tabela espacos, ele vai criar

  const quantidade = await Espaco.count(); //conta quantas linhas tem na tabela, ou seja, quantas entidades (espacos) tem
  if (quantidade === 0) { //aqui se nao tiver nenhuma linha, insere os dados abaixo, mas caso tenha, ignora a parte de criar
    await Espaco.bulkCreate([ //insere uma lista de uma vez só com os 6 espacos pedidos nos requisitos
      {
        nome: "Laboratório de redes",
        localizacao: "Bloco A, Sala 66",
        capacidade: 30,
        recursos: "Roteadores Cisco, switches gerenciáveis, patch panels e cabos de rede.",
        situacao: "Disponível"
      },
      {
        nome: "Sala maker",
        localizacao: "Bloco A, Sala 60.2",
        capacidade: 20,
        recursos: "Impressoras 3D, bancadas eletrônicas, kits Arduino e ferramentas de prototipagem.",
        situacao: "Em uso"
      },
      {
        nome: "Auditório",
        localizacao: "Bloco A, Térreo",
        capacidade: 120,
        recursos: "Projetor Epson, sistema de som surround, microfones sem fio e palco.",
        situacao: "Disponível"
      },
      {
        nome: "Laboratório de informática",
        localizacao: "Bloco B, Sala 236",
        capacidade: 35,
        recursos: "Computadores com Windows 11 e Linux, projetor Epson e lousa branca.",
        situacao: "Disponível"
      },
      {
        nome: "Sala de audiovisual",
        localizacao: "Bloco B, Sala 235",
        capacidade: 15,
        recursos: "Câmeras DSLR, iluminação softbox, microfones lapela e mesa de som.",
        situacao: "Em manutenção"
      },
      {
        nome: "Biblioteca setorial",
        localizacao: "Bloco B, Térreo",
        capacidade: 50,
        recursos: "Mesas de estudo individual e em grupo, acervo temático e terminais de consulta.",
        situacao: "Disponível"
      }
    ]);
  }
}

module.exports = { createApp, prepararBanco };
