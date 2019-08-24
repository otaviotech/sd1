const mathjs = require('mathjs');

function evaluate(expression) {
  return mathjs.evaluate(expression);
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
