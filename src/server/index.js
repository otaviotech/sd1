const Hapi = require('hapi');
const HapiRouter = require('hapi-router');
const HapiApiKeyPlugin = require('hapi-api-key');
// const Blipp = require('blipp');
const env = require('../utils/env');

let server;

async function init() {
  await server.initialize();

  return server;
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
        origin: ['*'], // an array of origins or 'ignore'
        headers: ['X-API-KEY'], // an array of strings - 'Access-Control-Allow-Headers'
        exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
        additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
        maxAge: 60,
        credentials: true, // boolean - 'Access-Control-Allow-Credentials'
      },
    },
  });

  await server.register([
    {
      plugin: HapiRouter,
      options: {
        routes: '**/*.ctrl.js',
      },
    },
    HapiApiKeyPlugin,
  ]);

  server.auth.strategy('api-key', 'api-key', {
    apiKeys: {
      'swagger-d8084d44-9721-497d-b1df-f18efc92738c': {
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
