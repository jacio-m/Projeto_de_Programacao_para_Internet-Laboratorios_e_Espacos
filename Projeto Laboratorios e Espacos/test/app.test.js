
// Importa a ferramenta de testes do Node.js.
const test = require("node:test");

// Importa funções para verificar os resultados dos testes.
const assert = require("node:assert/strict");

// Importa as funções que criam a aplicação e preparam o banco de dados.
const { createApp, prepararBanco } = require("../app");

// Importa a conexão com o banco de dados.
const { sequelize } = require("../models");

// Declara as variáveis utilizadas pelo servidor de testes.
let servidor;
let baseUrl;

// Executa antes dos testes para preparar o ambiente.
test.before(async () => {
  // Prepara o banco de dados para os testes.
  await prepararBanco();

  // Cria a aplicação e inicia o servidor em uma porta disponível.
  servidor = createApp().listen(0);

  // Aguarda o servidor começar a funcionar.
  await new Promise((resolve) =>
    servidor.once("listening", resolve)
  );

  // Monta o endereço local utilizado nas requisições dos testes.
  baseUrl = `http://127.0.0.1:${servidor.address().port}`;
});

// Executa depois dos testes para encerrar os recursos utilizados.
test.after(async () => {
  // Verifica se o servidor foi iniciado antes de fechá-lo.
  if (servidor) {
    // Fecha o servidor e aguarda a conclusão da operação.
    await new Promise((resolve, reject) => {
      servidor.close((erro) =>
        erro ? reject(erro) : resolve()
      );
    });
  }

  // Encerra a conexão com o banco de dados.
  await sequelize.close();
});

// Testa se a página inicial apresenta os espaços em destaque.
test("a página inicial apresenta os espaços em destaque", async () => {
  // Faz uma requisição para a página inicial.
  const resposta = await fetch(`${baseUrl}/`);

  // Converte o conteúdo da resposta para texto HTML.
  const html = await resposta.text();

  // Verifica se a página retornou o código HTTP 200.
  assert.equal(resposta.status, 200);

  // Verifica se o nome do projeto aparece na página.
  assert.match(html, /Laboratórios e Espaços/);

  // Verifica se a seção de destaques está presente.
  assert.match(html, /Espaços em destaque/);
});

// Testa se a listagem apresenta os espaços do banco de dados.
test("a listagem apresenta os espaços do banco", async () => {
  // Faz uma requisição para a página de listagem.
  const resposta = await fetch(`${baseUrl}/espacos`);

  // Obtém o HTML retornado pela página.
  const html = await resposta.text();

  // Verifica se a listagem foi carregada corretamente.
  assert.equal(resposta.status, 200);

  // Verifica se o título da listagem aparece.
  assert.match(html, /Consulta de espaços/);

  // Verifica se o laboratório de redes aparece na página.
  assert.match(html, /Laboratório de redes/);
});

// Testa se a página de detalhes apresenta um espaço específico.
test("a página de detalhes apresenta um espaço", async () => {
  // Solicita os detalhes do espaço com ID 1.
  const resposta = await fetch(`${baseUrl}/espacos/1`);

  // Obtém o HTML da página de detalhes.
  const html = await resposta.text();

  // Verifica se a página foi carregada com sucesso.
  assert.equal(resposta.status, 200);

  // Confirma se o nome do espaço aparece na página.
  assert.match(html, /Laboratório de redes/);
});

// Testa se a rota de saúde retorna uma resposta JSON correta.
test("o endpoint de saúde responde em JSON", async () => {
  // Faz uma requisição para a rota de saúde.
  const resposta = await fetch(`${baseUrl}/saude`);

  // Converte a resposta JSON em um objeto JavaScript.
  const dados = await resposta.json();

  // Verifica se a resposta possui o código HTTP 200.
  assert.equal(resposta.status, 200);

  // Confirma se o status retornado é "ok".
  assert.equal(dados.status, "ok");
});

// Testa se um endereço inexistente retorna o erro 404.
test("um endereço inexistente retorna 404", async () => {
  // Faz
