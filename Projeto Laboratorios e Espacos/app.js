
// Esse código configura a aplicação e prepara o banco de dados assim que o servidor é iniciado.

// Importa o módulo path para trabalhar com caminhos de arquivos e pastas.
const path = require("node:path");

// Importa o Express para criar e configurar a aplicação web.
const express = require("express");

// Importa o mecanismo de templates Handlebars para renderizar as páginas HTML.
const { engine } = require("express-handlebars");

// Importa a conexão com o banco de dados e o modelo Espaco.
const { sequelize, Espaco } = require("./models"); // requisitando Espaco dos models

// Importa as rotas da página inicial e do endpoint de saúde.
const indexRouter = require("./routes/index");

// Importa as rotas responsáveis pela listagem e pelos detalhes dos espaços.
const espacosRouter  = require("./routes/espacos");

// Função responsável por criar e configurar a aplicação Express.
function createApp() {
  // Cria uma nova instância da aplicação.
  const app = express();

  // Configura o Handlebars como mecanismo de renderização das páginas.
  app.engine(
    "hbs",
    engine({
      // Define a extensão dos arquivos de template.
      extname: ".hbs",

      // Define o layout principal utilizado pelas páginas.
      defaultLayout: "main",

      // Define a pasta onde ficam os layouts.
      layoutsDir: path.join(__dirname, "views", "layouts"),

      // Define a pasta onde ficam os componentes reutilizáveis.
      partialsDir: path.join(__dirname, "views", "partials"),

      // Define funções auxiliares que podem ser utilizadas nos templates.
      helpers: {
        // Formata uma data para o padrão brasileiro.
        formatarData(valor) {
          return new Intl.DateTimeFormat("pt-BR", {
            dateStyle: "short"
          }).format(new Date(valor));
        }
      }
    })
  );

  // Define o Handlebars como mecanismo de visualização da aplicação.
  app.set("view engine", "hbs");

  // Informa onde estão localizados os arquivos das páginas.
  app.set("views", path.join(__dirname, "views"));

  // Permite interpretar dados enviados por formulários.
  app.use(express.urlencoded({ extended: false }));

  // Permite interpretar requisições que enviam dados no formato JSON.
  app.use(express.json());

  // Disponibiliza arquivos estáticos, como CSS, imagens e JavaScript.
  app.use(express.static(path.join(__dirname, "public")));

  // Registra
