function withoutSpaces(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return str.replace(/\s/g, '');
}

module.exports = {
  withoutSpaces,
};
