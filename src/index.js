require('dotenv').config();

const createServer = require('./server');
const env = require('./utils/env');

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

async function bootstrap() {
  const server = await createServer({
    port: env.APP_PORT,
    host: env.APP_HOST,
  });

  server.start();
}

bootstrap();
