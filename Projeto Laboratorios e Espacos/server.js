//arquivo responsavel por preparar o banco e ligar o servidor na porta 3000

const { createApp, prepararBanco } = require("./app");

const PORT = Number(process.env.PORT) || 3000;

async function iniciarServidor() {
  try {
    await prepararBanco(); //espera o banco estar pronto antes de subir o servidor

    const app = createApp();
    const servidor = app.listen(PORT, () => {
      console.log(`Laboratórios e Espaços disponível em http://localhost:${PORT}`);
      console.log("Pressione Ctrl+C para encerrar.");
    });

    return servidor;
  } catch (erro) {
    console.error("Não foi possível iniciar o servidor.");
    console.error(erro);
    process.exitCode = 1;
    return null;
  }
}

if (require.main === module) {
  iniciarServidor();
}

module.exports = { iniciarServidor };
