const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const {
  afterEach, beforeEach, describe, it,
} = exports.lab = Lab.script();
const createServer = require('../src/server');

describe('GET /number/2/pow/3', () => {
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
      url: '/number/2/pow/3',
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with the right feedback', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/number/2/pow/3',
    });

    expect(res.result.success).to.be.true();
  });

  it('responds with the right value', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/number/2/pow/3',
    });

    expect(res.result.result).to.equal(8);
  });
});

describe('GET /number/3/factorial', () => {
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
      url: '/number/3/factorial',
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with the right feedback', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/number/3/factorial',
    });

    expect(res.result.success).to.be.true();
  });

  it('responds with the right value', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/number/3/factorial',
    });

    expect(res.result.result).to.equal(6);
  });
});

describe('GET /number/500/fibonacci', () => {
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
      url: '/number/500/fibonacci',
    });

    expect(res.statusCode).to.equal(200);
  });

  it('responds with the right feedback', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/number/500/fibonacci',
    });

    expect(res.result.success).to.be.true();
  });

  it('responds with the right value', async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/number/500/fibonacci',
    });

    expect(res.result.result).to.equal('139423224561697880139724382870407283950070256587697307264108962948325571622863290691557658876222521294125');
  });
});
