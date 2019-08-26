const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { describe, it } = exports.lab = Lab.script();

const stringUtils = require('../src/utils/string');

describe('StringUtils', () => {
  describe('withoutSpaces', () => {
    it('Deve remover os espaços de uma string', () => {
      const str = '  a b  c d e  ';
      const result = stringUtils.withoutSpaces(str);
      expect(result).to.equal('abcde');
    });

    it('Deve perceber quando o parametro não for do tipo string', () => {
      const strs = [2, undefined, null];
      strs.forEach((str) => {
        const result = stringUtils.withoutSpaces(str);
        expect(result).to.equal(str);
      });
    });
  });
});
