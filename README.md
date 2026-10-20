# Projeto de Programação para Internet — Laboratórios e Espaços — Programação para Internet (Grupo 06)
Aplicação web desenvolvida para a disciplina de Programação para Internet, com o objetivo de mapear, disponibilizar informações e gerenciar o uso de laboratórios, salas especializadas e espaços coletivos institucionais.

# Turma: 
Info3M

# Professor: 
Andre Vieira dos Santos.

# Componetes: 
Débora Emanuelly Pinheiro Lopes.
Matrícula: 20241114010012

Jácio Mauê do Nascimento Silva.
Matrícula: 20241114010066

Júlia Endilly Dantas de Araújo.
Matrícula: 20241114010039

Maria Eduarda Rodrigues De Carvalho.
Matrícula: 20241114010067


# Problema Atendido e Público Beneficiado
    Problema: Dificuldade de alunos, professores e visitantes em visualizar a disponibilidade, capacidade e recursos de laboratórios e salas de estudo/eventos.
    Público Beneficiado: Comunidade acadêmica (estudantes, docentes e equipe técnica).

# Entidade Principal e Campos
    Entidade Principal: `Espaco` (`models/espaco.js`)

    Campos:
  * `id`: `INTEGER` (Identificador único, Chave Primária autoincrementada)
  * `nome`: `STRING` (Nome do laboratório ou espaço)
  * `localizacao`: `STRING` (Bloco, prédio ou setor)
  * `capacidade`: `INTEGER` (Lotação máxima permitida)
  * `recursos`: `TEXT` (Descrição dos equipamentos e tecnologias disponíveis)
  * `situacao`: `STRING` (Situação atual: `Disponível`, `Em uso` ou `Em manutenção`)

>Critério de Ordenação: A listagem de espaços é ordenada obrigatoriamente por nome em ordem alfabética (`ASC`).

# Tecnologias Utilizadas
    Runtime: Node.js 
    Framework Web: Express.js
    Template Engine: Handlebars (`express-handlebars`)
    ORM: Sequelize
    Banco de Dados: SQLite (`sqlite3`)
    Testes Automatizados: Node Test Runner (`node --test`) e Supertest


# Pré-requisitos

    Node.js versão 18 ou superior instalado no sistema.
    npm (gerenciador de pacotes do Node.js).


# Instalação das Dependências
    Navegue até a pasta do projeto no terminal e execute o comando abaixo para instalar todas as bibliotecas necessárias:

    npm install

# Execução do Servidor
    Com as dependências instaladas, execute o comando a seguir para iniciar a aplicação:

    npm start

    Após executar o comando, acesse a aplicação no navegador em: `http://localhost:3000`

# Execução dos Testes
    Para executar os testes automatizados de integração e validar as rotas:

    npm test

# Rotas Disponíveis

    | Método | Rota           | Descrição / Comportamento |
    | `GET`  | `/`            | Página inicial com painel em faixa temática e 3 espaços em destaque |
    | `GET`  | `/saude`       | Endpoint de diagnóstico da aplicação (`{"status": "ok"}`) |
    | `GET`  | `/espacos`     | Listagem completa dos espaços cadastrados (ordenados por nome A-Z) |
    | `GET`  | `/espacos/:id` | Detalhes completos de um espaço específico por ID |
    | `GET`  | `*`            | Trata URLs inexistentes ou IDs inválidos renderizando a página de Erro 404 |


# Organização dos Diretórios

    Projeto Laboratorios e Espacos/
    database/           # Local onde o arquivo SQLite é gerado (.gitkeep)
    models/             # Camada de Dados (espaco.js e index.js)
    routes/             # Camada de Controle e Rotas (espacos.js e index.js)
    views/              # Camada de Apresentação (Handlebars - páginas, layouts e partials)
    public/             # Arquivos estáticos (stylesheets/style.css)
    test/               # Testes automatizados de integração (app.test.js)
    app.js              # Configuração do Express e middlewares
    server.js           # Inicialização do servidor HTTP e sincronização com o banco
    package.json        # Dependências, scripts e configurações do projeto


# Correspondência entre a Aplicação e os Quatro Wireframes

    Wireframe 01 — Página Inicial (/): Apresenta o painel superior em faixa temática com texto introdutório do portal e 3 cartões de espaços em destaque trazidos do banco de dados.

    Wireframe 02 — Consulta/Listagem (/espacos): Exibe o título "Espaços cadastrados", botões de filtro e a lista completa em cartões verticais com capacidade, localização, recursos e situação.

    Wireframe 03 — Detalhamento (/espacos/:id): Apresenta o painel principal com os dados completos do espaço, bloco lateral com a situação atual e botão de retorno para a listagem.

    Wireframe 04 — Erro 404: Exibe a mensagem tratada "404 - Espaço não encontrado" acompanhada de um botão direto para retornar à consulta de espaços.

# Decisões e Adaptações Realizadas pelo Grupo

    Refatoração do Domínio: Transição do projeto base (Mural de Publicações) para o domínio Espaco (models/espaco.js), garantindo a consulta com ordenação alfabética obrigatória.

    Identidade Visual: Ajuste da paleta de cores no arquivo public/stylesheets/style.css, conforme especificado para o Grupo 06.

    Reutilização de Componentes: Uso de partial Handlebars (partials/cartao-espaco.hbs) para renderizar os cartões de forma padronizada tanto na página inicial quanto na listagem.

    Povoamento Automático: O arquivo server.js sincroniza o SQLite e realiza um seed automático caso o banco esteja vazio, cadastrando 6 espaços iniciais para testes.

    Tratamento de Erros: Configuração de intermediadores (middlewares) em routes/espacos.js para capturar IDs inexistentes (ex: /espacos/9999) ou inválidos (ex: /espacos/abc), direcionando o usuário de forma amigável para a página de Erro 404 com código HTTP.
