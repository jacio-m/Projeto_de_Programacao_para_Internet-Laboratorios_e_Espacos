//arquivo de testes automatizados para verificar se todas as rotas e erros estao funcionando

const test = require("node:test");
const assert = require("node:assert/strict");
const { createApp, prepararBanco } = require("../app");
const { sequelize } = require("../models");

let servidor;
let baseUrl;

//antes de rodar os testes, prepara o banco e abre o servidor em uma porta livre
test.before(async () => {
  await prepararBanco();
  servidor = createApp().listen(0);
  await new Promise((resolve) => servidor.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${servidor.address().port}`;
});

//depois que os testes acabam, fecha o servidor e a conexao com o banco
test.after(async () => {
  await new Promise((resolve, reject) => {
    servidor.close((erro) => (erro ? reject(erro) : resolve()));
  });
  await sequelize.close();
});

test("a página inicial responde e apresenta o título e os destaques", async () => {
  const resposta = await fetch(`${baseUrl}/`);
  const html = await resposta.text();
  assert.equal(resposta.status, 200);
  assert.match(html, /Laboratórios e Espaços/);
  assert.match(html, /Espaços em destaque/);
});

test("a listagem apresenta os espaços do banco", async () => {
  const resposta = await fetch(`${baseUrl}/espacos`);
  const html = await resposta.text();
  assert.equal(resposta.status, 200);
  assert.match(html, /Espaços cadastrados/);
  assert.match(html, /Laboratório de redes/);
  assert.match(html, /<strong>6<\/strong> espaço\(s\) encontrado\(s\)/);
});

test("a página de detalhes apresenta um espaço existente", async () => {
  const resposta = await fetch(`${baseUrl}/espacos/1`);
  const html = await resposta.text();
  assert.equal(resposta.status, 200);
  assert.match(html, /Laboratório de redes/);
  assert.match(html, /Bloco A, Sala 66/);
});

test("um identificador inexistente retorna 404", async () => {
  const resposta = await fetch(`${baseUrl}/espacos/99999`);
  const html = await resposta.text();
  assert.equal(resposta.status, 404);
  assert.match(html, /Espaço não encontrado/);
});

test("um identificador inválido retorna 404", async () => {
  const resposta = await fetch(`${baseUrl}/espacos/abc`);
  const html = await resposta.text();
  assert.equal(resposta.status, 404);
  assert.match(html, /Espaço não encontrado/);
});

test("o endpoint de saúde responde em JSON", async () => {
  const resposta = await fetch(`${baseUrl}/saude`);
  const dados = await resposta.json();
  assert.equal(resposta.status, 200);
  assert.equal(dados.status, "ok");
});

test("um endereço inexistente retorna 404", async () => {
  const resposta = await fetch(`${baseUrl}/nao-existe`);
  const html = await resposta.text();
  assert.equal(resposta.status, 404);
  assert.match(html, /Espaço não encontrado/);
});
