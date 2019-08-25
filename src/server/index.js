const fs = require('fs-extra');
const path = require('path');
const Hapi = require('hapi');
const HapiRouter = require('hapi-router');
const HapiApiKeyPlugin = require('hapi-api-key');
// const Blipp = require('blipp');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const Inert = require('@hapi/inert');
const env = require('../utils/env');
const constants = require('../utils/constants');

let server;

/**
 * Gera a interface do Swagger.
 */
async function generateSwaggerUi() {
  const swaggerYmlPath = path.resolve(constants.PROJECT_ROOT, 'swagger.yaml');
  const newIndexHtml = path.resolve(constants.PUBLIC_DIRECTORY, 'swagger/index.html');
  const swaggerOutputYmlPath = path.resolve(constants.PUBLIC_DIRECTORY, 'swagger/swagger.yml');
  const swaggerOutputDirectory = path.resolve(constants.PUBLIC_DIRECTORY, 'swagger');

  await fs.copy(pathToSwaggerUi, swaggerOutputDirectory);
  await fs.copy(swaggerYmlPath, swaggerOutputYmlPath);
  let indexHtmlOutput = await fs.readFile(newIndexHtml);
  indexHtmlOutput = indexHtmlOutput.toString()
    .replace('https://petstore.swagger.io/v2/swagger.json', 'swagger.yml');
  await fs.writeFileSync(newIndexHtml, indexHtmlOutput, 'utf8');

  let swaggerYmlOutput = await fs.readFile(swaggerOutputYmlPath);
  swaggerYmlOutput = swaggerYmlOutput.toString()
    .replace('https://petstore.swagger.io/v2/swagger.json', 'swagger.yml')
    .replace('{{ host }}', env.APP_URL);
  await fs.writeFileSync(swaggerOutputYmlPath, swaggerYmlOutput, 'utf8');
}

async function init() {
  await server.initialize();
  return server;
}

async function registerPlugins() {
  await server.register([
    {
      plugin: HapiRouter,
      options: {
        routes: '**/*.ctrl.js',
      },
    },
    HapiApiKeyPlugin,
    Inert,
  ]);
}

async function start() {
  await server.start();

  console.log(`Server running at: ${server.info.uri}`);

  return server;
}

module.exports = async function createServer(serverConfig = {
  port: env.APP_PORT,
  host: env.APP_HOST,
}) {
  server = Hapi.server({
    ...serverConfig,
    routes: {
      cors: {
        origin: ['*'],
        headers: ['X-API-KEY'],
        exposedHeaders: ['Accept'],
        additionalExposedHeaders: ['Accept'],
        maxAge: 60,
        credentials: true,
      },
      files: {
        relativeTo: constants.PUBLIC_DIRECTORY,
      },
    },
  });

  await registerPlugins();

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: constants.PUBLIC_DIRECTORY,
        redirectToSlash: true,
        index: true,
      },
    },
    config: {
      auth: false,
    },
  });

  generateSwaggerUi();

  server.auth.strategy('api-key', 'api-key', {
    apiKeys: {
      [env.SWAGGER_API_KEY]: {
        name: 'swagger',
      },
    },
  });

  server.auth.default('api-key');

  // await server.register({ plugin: Blipp, options: { showAuth: true } });

  return {
    server,
    init,
    start,
  };
};
