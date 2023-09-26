'use strict';

const request = require('supertest'); // Supertest allows you to make HTTP requests to your Express app for testing.
const app = require('../lib/server.js'); // Import your Express app
const { sequelize } = require('../lib/auth/models/index.js'); // Import Sequelize and database configurations
require('dotenv').config();

// Use beforeAll to synchronize your database before running tests
beforeAll(async () => {
  // Sync your Sequelize models with the database
  await sequelize.sync({ force: true }); // Use force: true to recreate the database during testing
});

// Use beforeEach to set up any necessary data before each test
beforeEach(async () => {
  // Create any records required for tests to pass
  // You can create users, populate your database, or perform any setup needed
});

// Use afterEach to clean up after each test
afterEach(async () => {
  // Drop tables or delete records created during tests
  // Reset the database to a clean state
});

// Use afterAll to perform cleanup after all tests are finished
afterAll(async () => {
  // Drop the tables in the database
  await sequelize.close(); // Close the database connection
});

describe('Testing our auth server', () => {
  test('User should be able to create an account', async () => {
    // Create a test user object with signup data
    const testUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    // Use Supertest to make a POST request to the signup route
    const response = await request(app)
      .post('/signup')
      .send(testUser);

    // Perform assertions to check if the signup was successful
    expect(response.status).toBe(201); // Expect a 201 Created status code
    expect(response.body.username).toBe(testUser.username); // Check if the username matches
    // You can add more assertions as needed
  });

  test('User should be able to login to an existing account', async () => {
    // Create a test user object with login credentials
    const testUser = {
      username: 'testuser',
      password: 'testpassword',
    };

    // Use Supertest to make a POST request to the signin route with basic authentication
    const response = await request(app)
      .post('/signin')
      .auth(testUser.username, testUser.password);

    // Perform assertions to check if the signin was successful
    expect(response.status).toBe(200); // Expect a 200 OK status code
    expect(response.body.username).toBe(testUser.username); // Check if the username matches
    // You can add more assertions as needed
  });
});
