/**
 * @module NumberService
 */

const mathjs = require('mathjs');
const Fibonacci = require('fibonacci');

/**
 * Calcula o fatorial de um número.
 * @param {number} number O número.
 * @return {number}
 */
function factorial(number) {
  return mathjs.factorial(number);
}

/**
 * Calcula a potência de um número.
 * @param {number} number O número.
 * @param {number} expoent O expoente.
 * @return {number}
 */
function pow(number, expoent) {
  return mathjs.pow(number, expoent);
}

/**
 * Calcula o número {number} na sequência de fibonacci.
 * @param {number} number O número.
 * @return {number}
 */
function fibonacci(number) {
  return Fibonacci.iterate(number);
}


module.exports = {
  factorial,
  pow,
  fibonacci,
};
