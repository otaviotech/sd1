const Hapi = require('hapi');
const HapiRouter = require('hapi-router');
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
  server = Hapi.server(serverConfig);

  await server.register({
    plugin: HapiRouter,
    options: {
      routes: '**/*.ctrl.js',
    },
  });

  return {
    server,
    init,
    start,
  };
};
