function withoutSpaces(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return str.replace(' ', '');
}

module.exports = {
  withoutSpaces,
};
