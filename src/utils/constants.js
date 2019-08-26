const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '../../');

module.exports = {
  PROJECT_ROOT,
  PUBLIC_DIRECTORY: path.resolve(PROJECT_ROOT, 'public'),
};
