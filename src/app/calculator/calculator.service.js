/**
 * @module CalculatorService
 */


const mathjs = require('mathjs');
const { withoutSpaces } = require('../../utils/string');

function evaluate(expression) {
  const sanitizedExpression = withoutSpaces(expression);
  return mathjs.evaluate(sanitizedExpression);
}

/**
 * Calcula a média aritimética de um array de números.
 * @param {number[]} numbers O array de números.
 * @return {number}
 */
function average(numbers) {
  return mathjs.mean(numbers);
}

/**
 * Calcula a mediana de um array de números.
 * @param {number[]} numbers O array de números.
 * @return {number}
 */
function median(numbers) {
  return mathjs.median(numbers);
}

module.exports = {
  evaluate,
  average,
  median,
};
