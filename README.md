<h1 align="center">Chat API</h1>
<div align="center">
  <img width="auto" height="23em" src="https://img.shields.io/badge/TypeScript-323330?style=flat&logo=TypeScript">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Node.js-323330?style=flat&logo=Node.js">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Express.js-323330?style=flat&logo=express">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Prisma-323330?style=flat&logo=Prisma">
  <img width="auto" height="23em" src="https://img.shields.io/badge/MySQL-323330?style=flate&logo=mysql">
  <img width="auto" height="23em" src="https://img.shields.io/badge/Jest-323330?style=flat&logo=jest&logoColor=99424F">
</div>

## Pré-Requisitos

  * NodeJS (v18.16.0) e npm (v9.5.1).
  * MySQL (v8.0).

## Executando o projeto

01 - Instale as dependências:
```bash
$ npm install
```

02 - Configure as variáveis de ambiente:
  - Crie uma copia do arquivo .env.example.
  - Modifique o nome de uma copia para `.env` e preencha com as informações necessárias.

03 - Rode as migrations e seeds:
```bash
$ npm run prisma:migration
$ npm run prisma:seed
```

04 - Builde o projeto:
```bash
$ npm run build
```

05 - Inicie o projeto:
```bash
$ npm start
```

## Executando o projeto com docker (opcional)

01 - Configure as variáveis de ambiente:
  - Importante se atentar com o valor do `DB_HOST`.

02 - Suba o projeto:
```bash
$ docker compose up
```

03 - Rode os seeds dentro do container da api:
```bash
$ docker exec -it [nome_do_container] bash
$ npm run prisma:seed
```

## Documentação

A documentação pode ser consultada através do endpoint: `/api-docs`
