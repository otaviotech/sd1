const Boom = require('@hapi/boom');
const routingUtils = require('../../utils/routing');
const calculatorService = require('./calculator.service');

module.exports = [
  {
    path: '',
    method: 'GET',
    handler(request) {
      try {
        const { expression } = request.query;

        const response = {
          expression,
          action: 'evaluate',
          result: calculatorService.evaluate(expression),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao avaliar a sua expressão.', error);
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
          result: calculatorService.average(numbers),
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
          result: calculatorService.median(numbers),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular a mediana.', error);
      }
    },
  },
].map(routingUtils.namespaceRoutesWith('calculator'));
