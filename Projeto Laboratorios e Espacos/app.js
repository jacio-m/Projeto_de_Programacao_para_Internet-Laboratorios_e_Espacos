
/* Importa o módulo path para trabalhar com caminhos de arquivos e pastas. */
const path = require("node:path");

/* Importa o Express para criar e configurar a aplicação web. */
const express = require("express");

/* Importa o mecanismo de templates Handlebars. */
const { engine } = require("express-handlebars");

/* Importa a conexão com o banco de dados e o modelo Espaco. */
const { sequelize, Espaco } = require("./models");

/* Importa as rotas da página inicial e do endpoint de saúde. */
const indexRouter = require("./routes/index");

/* Importa as rotas de listagem e detalhes dos espaços. */
const espacosRouter = require("./routes/espacos");

/* Função responsável por criar e configurar a aplicação Express. */
function createApp() {
  /* Cria uma nova instância da aplicação. */
  const app = express();

  /* Configura o Handlebars como mecanismo de renderização. */
  app.engine(
    "hbs",
    engine({
      /* Define a extensão dos arquivos de template. */
      extname: ".hbs",

      /* Define o layout principal das páginas. */
      defaultLayout: "main",

      /* Define a pasta dos layouts. */
      layoutsDir: path.join(__dirname, "views", "layouts"),

      /* Define a pasta dos componentes reutilizáveis. */
      partialsDir: path.join(__dirname, "views", "partials"),

      /* Define funções auxiliares utilizadas nos templates. */
      helpers: {
        /* Formata uma data para o padrão brasileiro. */
        formatarData(valor) {
          return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short"
          }).format(new Date(valor));
        }
      }
    })
  );

  /* Define o Handlebars como mecanismo de visualização. */
  app.set("view engine", "hbs");

  /* Informa onde estão os arquivos das páginas. */
  app.set("views", path.join(__dirname, "views"));

  /* Permite interpretar os dados enviados por formulários. */
  app.use(express.urlencoded({ extended: false }));

  /* Permite interpretar requisições no formato JSON. */
  app.use(express.json());

  /* Disponibiliza arquivos estáticos, como CSS e imagens. */
  app.use(express.static(path.join(__dirname, "public")));

  /* Registra as rotas da página inicial e de saúde. */
  app.use("/", indexRouter);

  /* Registra as rotas de listagem e detalhes dos espaços. */
  app.use("/espacos", espacosRouter);

  /* Trata endereços que não correspondem a nenhuma rota. */
  app.use((req, res) => {
    res.status(404).send("Página não encontrada.");
  });

  /* Retorna a aplicação configurada. */
  return app;
}

/* Função assíncrona responsável por preparar o banco de dados. */
async function prepararBanco() {
  /* Confere a conexão com o banco de dados. */
  await sequelize.authenticate();

  /* Sincroniza os modelos com o banco de dados existente. */
  await sequelize.sync();

  /* Verifica se já existem espaços cadastrados. */
  const quantidadeEspacos = await Espaco.count();

  /* Cadastra dados iniciais somente se a tabela estiver vazia. */
  if (quantidadeEspacos === 0) {
    await Espaco.bulkCreate([
      {
        nome: "Laboratório de redes",
        descricao: "Espaço destinado a atividades práticas de redes de computadores.",
        capacidade: 30,
        localizacao: "Bloco de Informática",
        recursos: "Computadores e equipamentos de rede"
      }
    ]);
  }
}

/* Exporta as funções utilizadas pelo servidor e pelos testes. */
module.exports = {
  createApp,
  prepararBanco
};
