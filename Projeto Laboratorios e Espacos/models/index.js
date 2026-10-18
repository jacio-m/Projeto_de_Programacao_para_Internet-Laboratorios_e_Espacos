//index.js é o arquivo principal pro bd funcionar

const path = require("node:path");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({ //criando o sequelize para fazer a comunicacao do JS com o BD
  dialect: "sqlite", //tipo do BD é SQLite
  storage: path.join(__dirname, "..", "database", "espacos.sqlite"), //vai armazenar na pasta database com o nome espacos.sqlite
  logging: false //para nao ficar escrevendo os comandos SQL no terminal
});

const Espaco = require("./espaco")(sequelize, DataTypes); //passando a conexao para espaco.js para poder juntar a tabela com o BD

module.exports = { sequelize, Espaco }; //exportando tanto a conexao quanto a tabela para que elas também possam ser usadas por outros arquivos