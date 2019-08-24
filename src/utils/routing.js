const env = require('./env');

const namespaceRoutesWith = (namespace) => (route) => ({
  ...route,
  path: `/v${env.API_VERSION}/${namespace}/${route.path}`,
});


module.exports = {
  namespaceRoutesWith,
};
