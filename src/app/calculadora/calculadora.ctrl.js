const Boom = require('@hapi/boom');
const routingUtils = require('../../utils/routing');
const calculadoraService = require('./calculadora.service');


module.exports = [
  {
    path: 'calculate',
    method: 'GET',
    handler(request) {
      try {
        const { expression } = request.query;

        const response = {
          expression,
          action: 'evaluate',
          result: calculadoraService.evaluate(expression),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao avaliar a sua expressão.', error);
      }
    },
  },
  {
    path: 'number/{number}/factorial',
    method: 'GET',
    handler(request) {
      try {
        const { number } = request.params;

        const response = {
          number,
          action: 'factorial',
          result: calculadoraService.factorial(number),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular o fatorial.', error);
      }
    },
  },
  {
    path: 'number/{number}/fibonacci',
    method: 'GET',
    handler(request) {
      try {
        const { number } = request.params;

        const response = {
          number,
          action: 'fibonacci',
          result: calculadoraService.fibonacci(number).number,
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular a sequência de fibonacci.', error);
      }
    },
  },
  {
    path: 'average',
    method: 'GET',
    handler(request) {
      try {
        const { numbers } = request.query;

        const response = {
          numbers,
          action: 'average',
          result: calculadoraService.average(numbers),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular a média.', error);
      }
    },
  },
  {
    path: 'median',
    method: 'GET',
    handler(request) {
      try {
        const { numbers } = request.query;

        const response = {
          numbers,
          action: 'median',
          result: calculadoraService.median(numbers),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular a mediana.', error);
      }
    },
  },
  {
    path: 'number/{number}/pow/{expoent}',
    method: 'GET',
    handler(request) {
      try {
        const { number, expoent } = request.params;

        const response = {
          number,
          action: 'pow',
          result: calculadoraService.pow(number, expoent),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular o fatorial.', error);
      }
    },
  },
].map(routingUtils.namespaceRoutesWith('calculadora'));
