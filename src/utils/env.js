const semver = require('semver');
const packageJson = require('../../package.json');

module.exports = {
  APP_HOST: process.env.APP_HOST || 'localhost',
  APP_PORT: process.env.PORT,
  APP_MAJOR_VERSION: semver.major(packageJson.version),
  API_VERSION: semver.major(packageJson.version) + 1,
};
