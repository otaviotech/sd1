# sd1 [![Build Status](https://travis-ci.com/otaviotech/sd1.svg?token=MCeACzihHrn4wsggCZWq&branch=master)](https://travis-ci.com/otaviotech/sd1) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
Calculadora cientifica tema do trabalho da disciplina de Sistemas Distribuidos.

Uma API Rest para realizar cálculos matemáticos.

Link do projeto hospedado no Heroku: https://sd1-calculadora-cientifica.herokuapp.com

Link das documentações do código fonte: https://sd1-calculadora-cientifica.herokuapp.com/docs

Link das documentações do swagger fonte: https://sd1-calculadora-cientifica.herokuapp.com/swagger

# Desenvolvimento

```sh
~ cp .env.example .env # Configure as variáveis de ambiente do projeto.
~ yarn # install - Instale as dependências do projeto.
~ yarn run dev # Execute a api.
```

# Testes automatizados

Para executar os testes:

```sh
~ yarn run test
```

Caso queira rodar os testes toda vez que algum arquivo for alterado, execute:

```sh
~ yarn run tdd
```

# Documentação

## API (Codebase)

Para gerar as documentações atualizadas do projeto(que utiliza JsDoc), execute:

```sh
~ yarn run docs:generate
```

# Swagger (Rest API)

Para gerar a documentação do Swagger, a partir do arquivo [swagger.yaml](swagger.yaml), execute:

```sh
~ yarn run docs:generate:swagger
```

As documentações ficam disponíveis nas rotas:


Documentação | Rota
---------|----------
 API (Codebase) | /docs | C1
 Swagger (Rest API) | /swagger | C2

# Continuous Integration (CI)

Configurado com o [TravisCI](https://travis-ci.com) para executar os testes.

# Licença

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](LICENSE)

