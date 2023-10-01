'use strict';

const express = require('express');
const cors = require('cors');
const basicAuth = require('./auth/middleware/basic.js');

const app = express(); 
const error404 = require('./middleware/404.js');
const error500 = require('./middleware/500.js');


const { handleSignup, handleSignin} = require('./auth/router.js');

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })) ;


app.post('/signup', basicAuth, handleSignup);
app.post('/signin', basicAuth, handleSignin);

app.use((error, request, response, next) => {
  if (error.path || error.method) {
    error404(error, request, response, next);
  } else {
    error500(error, request, response, next);
  }
});

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log('Express now running on port:', port);
    });
  },
};