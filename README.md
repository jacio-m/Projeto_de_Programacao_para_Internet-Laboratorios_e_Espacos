# Projeto de Programação para Internet — Laboratórios e Espaços (Grupo 06)
Aplicação web desenvolvida para a disciplina de Programação para Internet, com o objetivo de mapear, disponibilizar informações e consultar laboratórios, salas especializadas e espaços coletivos do campus.

## Turma
Info3M

## Professor
André Vieira dos Santos

## Componentes
* **Débora Emanuelly Pinheiro Lopes** — Matrícula: 20241114010012
* **Jácio Mauê do Nascimento Silva** — Matrícula: 20241114010066
* **Júlia Endilly Dantas de Araújo** — Matrícula: 20241114010039
* **Maria Eduarda Rodrigues De Carvalho** — Matrícula: 20241114010067

---

## Problema Atendido e Público Beneficiado
* **Problema:** Dificuldade de alunos, professores e visitantes em visualizar a disponibilidade, localização, capacidade e recursos de laboratórios e salas de estudo/eventos do campus.
* **Público Beneficiado:** Comunidade acadêmica (estudantes, docentes e equipe técnica).

## Entidade Principal e Campos
* **Entidade Principal:** `Espaco` (`models/espaco.js`)
* **Campos:**
  * `id`: `INTEGER` (Identificador único, chave primária autoincrementada)
  * `nome`: `STRING(120)` (Nome do laboratório ou espaço)
  * `localizacao`: `STRING(120)` (Bloco, sala ou setor do campus)
  * `capacidade`: `INTEGER` (Lotação máxima permitida de pessoas)
  * `recursos`: `TEXT` (Descrição dos equipamentos e recursos disponíveis)
  * `situacao`: `STRING(40)` (Situação atual: `Disponível`, `Em uso` ou `Em manutenção`)

> **Critério de Ordenação:** A listagem de espaços é ordenada obrigatoriamente por `nome` em ordem alfabética (`ASC`).

## Tecnologias Utilizadas
* **Runtime:** Node.js
* **Framework Web:** Express.js
* **Template Engine:** Handlebars (`express-handlebars`)
* **ORM:** Sequelize
* **Banco de Dados:** SQLite (`sqlite3`)
* **Testes Automatizados:** Node Test Runner (`node --test`) e Supertest

## Pré-requisitos
* Node.js versão 18 ou superior instalado no sistema.
* NPM (gerenciador de pacotes do Node.js).

## Instalação das Dependências
Navegue até a pasta do projeto no terminal e execute o comando abaixo para instalar todas as bibliotecas necessárias:

```bash
cd "Projeto Laboratorios e Espacos"
npm install
```

## Execução do Servidor
Com as dependências instaladas, execute o comando a seguir para iniciar a aplicação:

```bash
npm start
```
*(Ou `npm run dev` para rodar em modo de observação).*  
Após executar o comando, acesse a aplicação no navegador em: `http://localhost:3000`

## Execução dos Testes
Para executar a suíte de testes automatizados e validar todas as rotas e tratamentos de erro:

```bash
npm test
```

## Rotas Disponíveis

| Método | Rota | Descrição / Comportamento |
| :--- | :--- | :--- |
| `GET` | `/` | Página inicial com painel em faixa temática e 3 espaços em destaque vindos do banco |
| `GET` | `/saude` | Endpoint de diagnóstico da aplicação em JSON (`{"status": "ok"}`) |
| `GET` | `/espacos` | Listagem completa dos espaços cadastrados ordenados por nome (A–Z) |
| `GET` | `/espacos/:id` | Detalhamento completo de um espaço específico validando o parâmetro `:id` |
| `GET` | `*` | Qualquer rota desconhecida ou ID inválido responde com status 404 contextualizado |

## Organização dos Diretórios

```text
Projeto Laboratorios e Espacos/
├── database/                  # Local onde o arquivo SQLite (espacos.sqlite) é armazenado
├── models/                    # Camada de Dados (espaco.js e index.js)
├── public/stylesheets/        # Folha de estilo CSS com identidade verde petróleo (style.css)
├── routes/                    # Rotas da aplicação (index.js e espacos.js)
├── test/                      # Testes automatizados (app.test.js)
├── views/                     # Templates Handlebars (index.hbs, 404.hbs, erro.hbs)
│   ├── espacos/               # Views de listagem (listar.hbs) e detalhes (detalhar.hbs)
│   ├── layouts/               # Layout principal (main.hbs)
│   └── partials/              # Componente reutilizável do cartão (cartao-espaco.hbs)
├── app.js                     # Configuração do Express, Handlebars, helpers, middlewares e seed
├── server.js                  # Inicialização do servidor HTTP e preparação do banco
└── package.json               # Dependências e scripts obrigatórios
```

## Correspondência entre a Aplicação e os Quatro Wireframes
* **Wireframe 01 — Página Inicial (`/`):** Faixa temática superior em verde petróleo com chamada para ação e 3 cartões de espaços em destaque recuperados do banco de dados.
* **Wireframe 02 — Listagem (`/espacos`):** Exibe o título `"Espaços cadastrados"`, contador de registros e grade de cartões verticais com ícone, nome, localização, capacidade, recursos, indicador de situação e link de detalhes.
* **Wireframe 03 — Detalhamento (`/espacos/:id`):** Layout dividido entre o painel principal (com todos os atributos rotulados do espaço) e o painel lateral destacando a situação atual de disponibilidade e botão de retorno.
* **Wireframe 04 — Erro 404:** Composição horizontal com o código `404` à esquerda e a mensagem `"Espaço não encontrado"` à direita, acompanhada do botão para voltar à listagem (`/espacos`).

## Decisões e Adaptações Realizadas pelo Grupo
* **Modelagem Contextualizada:** Os 6 espaços obrigatórios foram populados com localizações e equipamentos inspirados nas salas e blocos reais do nosso campus, verificando com `Espaco.count()` antes do `bulkCreate()` para evitar duplicação ao reiniciar.
* **Identidade Visual e Acessibilidade:** Paleta verde petróleo e azul esverdeado aplicada em `public/stylesheets/style.css`, garantindo que os indicadores de situação (`Disponível`, `Em uso`, `Em manutenção`) apresentem tanto diferenciação visual quanto texto explícito.
* **Helpers e Partials:** Criação do partial `views/partials/cartao-espaco.hbs` e dos helpers `classeSituacao`, `iconeEspaco` e `formatarData` no `app.js`.
* **Validação e Tratamento de Erros:** Validação de `req.params.id` como inteiro positivo antes da consulta com `findByPk()`, além dos middlewares de erro 404 e 500 e middleware próprio de registro de requisições no terminal.
