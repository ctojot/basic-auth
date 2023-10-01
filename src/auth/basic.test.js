'use strict';

const basicAuth = require('./middleware/basic');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const { Users } = require('./models/users-model');

beforeAll(async () => {
  await Users.create({
    username: 'Test',
    password: await bcrypt.hash('test', 10),
  });
});

describe('Tests for basic auth middleware', () => {
  test('Should parse basic auth header', async () => {
    let encodedCredentials = base64.encode('Test:test');
    const authHeader = {
      authorization: `Basic ${encodedCredentials}`,
    };
    const req = {
      path: '/signin',
      headers: authHeader,
    };
    const res = null;
    const next = jest.fn();

    basicAuth(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});