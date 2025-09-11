# SportTechNews API

Esta é uma API RESTful para um sistema de notícias esportivas, permitindo o gerenciamento de usuários, artigos, categorias e tags. A API foi desenvolvida usando Node.js, Express, TypeScript e Prisma ORM com PostgreSQL como banco de dados.

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/appdb"
JWT_SECRET="seu_segredo_jwt_aqui"
```

*   `DATABASE_URL`: URL de conexão com o banco de dados PostgreSQL.
*   `JWT_SECRET`: Chave secreta para a assinatura de tokens JWT.

### Docker

O projeto pode ser executado usando Docker e Docker Compose. Certifique-se de ter o Docker instalado em sua máquina.

1.  **Construir e Iniciar os Serviços:**

    ```bash
    docker-compose up --build -d
    ```

    Isso construirá as imagens, iniciará o contêiner do PostgreSQL e o contêiner da aplicação.

2.  **Parar os Serviços:**

    ```bash
    docker-compose down
    ```

    Isso irá parar e remover os contêineres e redes criados pelo `docker-compose`.

## Scripts Disponíveis

No `package.json`, você encontrará os seguintes scripts úteis:

*   `npm run dev`: Inicia o servidor de desenvolvimento com `nodemon` e `ts-node`, monitorando as alterações nos arquivos `.ts`.
*   `npm start`: Inicia a aplicação compilada em JavaScript (após a execução de `npx prisma migrate deploy`).
*   `npx prisma migrate deploy`: Aplica as migrações do Prisma para o banco de dados. Este comando é executado automaticamente ao iniciar a aplicação via Docker.

## Estrutura do Projeto

```
.
├── prisma/
│   ├── migrations/             # Migrações do banco de dados
│   └── schema.prisma           # Definição do esquema do banco de dados (Prisma)
├── src/
│   ├── controllers/          # Lógica de manipulação de requisições
│   ├── middleware/           # Middlewares (ex: autenticação, autorização)
│   ├── routes/               # Definição de rotas da API
│   ├── services/             # Lógica de negócio e interação com o Prisma
│   ├── utils/                # Funções utilitárias (ex: validação)
│   └── index.ts              # Ponto de entrada da aplicação
├── .env.sample               # Exemplo de arquivo de variáveis de ambiente
├── Dockerfile                # Configuração do Docker para a aplicação
├── docker-compose.yml        # Orquestração de serviços Docker (aplicação e banco de dados)
├── package.json              # Metadados e dependências do projeto
├── README.md                 # Este arquivo
└── tsconfig.json             # Configuração do TypeScript
```
