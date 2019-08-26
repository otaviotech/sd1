// $lab:coverage:off$

const Boom = require('@hapi/boom');
const routingUtils = require('../../utils/routing');
const numberService = require('./number.service');

module.exports = [
  {
    path: '{number}/factorial',
    method: 'GET',
    handler(request) {
      try {
        const { number } = request.params;

        const response = {
          number,
          action: 'factorial',
          result: numberService.factorial(number),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular o fatorial.', error);
      }
    },
  },
  {
    path: '{number}/fibonacci',
    method: 'GET',
    handler(request) {
      try {
        const { number } = request.params;

        const response = {
          number,
          action: 'fibonacci',
          result: numberService.fibonacci(number).number,
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular a sequência de fibonacci.', error);
      }
    },
  },
  {
    path: '{number}/pow/{expoent}',
    method: 'GET',
    handler(request) {
      try {
        const { number, expoent } = request.params;

        const response = {
          number,
          action: 'pow',
          result: numberService.pow(number, expoent),
          success: true,
        };

        return response;
      } catch (error) {
        throw Boom.badRequest('Erro ao calcular o fatorial.', error);
      }
    },
  },
].map(routingUtils.namespaceRoutesWith('number'));
// $lab:coverage:on$
