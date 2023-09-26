'use strict';

const Users = require('./userModel'); // Import your user model
const bcrypt = require('bcrypt');

const basicAuth = async (req, res, next) => {
  // Authentication logic here
  const signinAuthMiddleware = async (req, res, next) => {
    try {
      // Extract basic authentication credentials from headers
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Basic ')) {
        // No valid authentication header provided
        const error = new Error('Unauthorized');
        error.status = 401;
        throw error;
      }

      // Decode and parse the authentication header
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');

      // Find the user in the database by username
      const user = await Users.findOne({ where: { username } });

      if (!user) {
        // User not found
        const error = new Error('Unauthorized');
        error.status = 401;
        throw error;
      }

      // Compare the provided password with the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        // Invalid password
        const error = new Error('Unauthorized');
        error.status = 401;
        throw error;
      }

      // If authentication is successful, attach the user object to the request
      req.user = user;

      // Call next to proceed to the route handler
      next();
    } catch (error) {
      // Handle authentication errors by calling next with an error
      next(error);
    }
  };
};

module.exports = basicAuth;