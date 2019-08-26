require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();
const env = require('../src/utils/env');
const constants = require('../src/utils/constants');


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

async function main() {
  await generateSwaggerUi();
  process.exit(0);
}

main();
