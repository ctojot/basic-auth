'use strict';

const server = require('./server');

// Define the port for your server
const port = process.env.PORT || 3001;

// Start the server by calling the start method from the server module
server.start(port);