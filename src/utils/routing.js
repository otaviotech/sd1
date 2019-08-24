const namespaceRoutesWith = (namespace) => (route) => ({
  ...route,
  path: `/${namespace}/${route.path}`,
});


module.exports = {
  namespaceRoutesWith,
};
