const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const {
  afterEach, beforeEach, describe, it,
} = exports.lab = Lab.script();
const createServer = require('../src/server');

describe('GET /v1/calculator/?expression=(2+2)/2', () => {
  let server;

  beforeEach(async () => {
    const { init } = await createServer();
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `/v1/calculator/?expression=${encodeURIComponent('(2 + 2) / 2')}`,
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with the right feedback', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `/v1/calculator/?expression=${encodeURIComponent('(2 + 2) / 2')}`,
    });

    expect(res.result.success).to.be.true();
  });

  it('responds with the right value', async () => {
    const res = await server.inject({
      method: 'GET',
      url: `/v1/calculator/?expression=${encodeURIComponent('(2 + 2) / 2')}`,
    });

    expect(res.result.result).to.equal(2);
  });
});

describe('GET /v1/calculator/average?numbers=1&numbers=2&numbers=3&&numbers=4', () => {
  let server;

  beforeEach(async () => {
    const { init } = await createServer();
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/calculator/average?numbers=1&numbers=2&numbers=3&&numbers=4',
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with the right feedback', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/calculator/average?numbers=1&numbers=2&numbers=3&&numbers=4',
    });

    expect(res.result.success).to.be.true();
  });

  it('responds with the right value', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/calculator/average?numbers=1&numbers=2&numbers=3&&numbers=4',
    });

    expect(res.result.result).to.equal(2.5);
  });
});

describe('GET /v1/calculator/median?numbers=1&numbers=2&numbers=3&&numbers=4&numbers=5', () => {
  let server;

  beforeEach(async () => {
    const { init } = await createServer();
    server = await init();
  });

  afterEach(async () => {
    await server.stop();
  });

  it('responds with 200', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/calculator/median?numbers=1&numbers=2&numbers=3&&numbers=4&numbers=5',
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with the right feedback', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/calculator/median?numbers=1&numbers=2&numbers=3&&numbers=4&numbers=5',
    });

    expect(res.result.success).to.be.true();
  });

  it('responds with the right value', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/v1/calculator/median?numbers=1&numbers=2&numbers=3&&numbers=4&numbers=5',
    });

    expect(res.result.result).to.equal(3);
  });
});
