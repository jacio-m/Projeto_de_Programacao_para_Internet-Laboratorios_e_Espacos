
// Importa as funções responsáveis por criar a aplicação e preparar o banco de dados.
const { createApp, prepararBanco } = require("./app");

// Define a porta do servidor usando a variável de ambiente PORT.
// Caso ela não esteja definida, utiliza a porta 3000.
const PORT = Number(process.env.PORT) || 3000;

// Função assíncrona responsável por iniciar o servidor.
async function iniciarServidor() {
  try {
    // Prepara o banco de dados antes de iniciar o servidor.
    await prepararBanco();

    // Cria a aplicação Express já configurada.
    const app = createApp();

    // Inicia o servidor na porta definida.
    const servidor = app.listen(PORT, () => {
      // Informa o endereço em que a aplicação está disponível.
      console.log(`Laboratórios e Espaços disponível em http://localhost:${PORT}`);

      // Informa como encerrar o servidor pelo terminal.
      console.log("Pressione Ctrl+C para encerrar.");
    });

    // Retorna a instância do servidor.
    return servidor;
  } catch (erro) {
    // Informa que ocorreu um problema durante a inicialização.
    console.error("Não foi possível iniciar o servidor.");

    // Exibe os detalhes do erro no terminal.
    console.error(erro);

    // Define o código de saída para indicar que ocorreu uma falha.
    process.exitCode = 1;

    // Retorna null para indicar que o servidor não foi iniciado.
    return null;
  }
}

// Verifica se este arquivo foi executado diretamente.
// Nesse caso, inicia o servidor.
if (require.main === module) {
  iniciarServidor();
}

// Exporta a função para que ela possa ser utilizada por outros arquivos.
module.exports = { iniciarServidor };
```
