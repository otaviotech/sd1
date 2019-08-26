// $lab:coverage:off$

const Hapi = require('hapi');
const HapiRouter = require('hapi-router');
const HapiApiKeyPlugin = require('hapi-api-key');
// const Blipp = require('blipp');
const Inert = require('@hapi/inert');
const env = require('../utils/env');
const constants = require('../utils/constants');

let server;

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

  server.auth.strategy('api-key', 'api-key', {
    apiKeys: {
      [env.SWAGGER_API_KEY]: {
        name: 'swagger',
      },
    },
  });

  if (process.env.NODE_ENV !== 'test') {
    server.auth.default('api-key');
  }

  // await server.register({ plugin: Blipp, options: { showAuth: true } });

  return {
    server,
    init,
    start,
  };
};

// $lab:coverage:on$
