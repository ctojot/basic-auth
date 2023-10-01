'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');


async function basicAuth(req, res, next) {
  if (req.path === '/signup') {
    if (req.body.password) {req.body.password = await bcrypt.hash(req.body.password, 10);}
    next();
  } else if (req.path === '/signin') {
    let basicHeaderParts = req.headers.authorization.split(' '); 
    let encodedString = basicHeaderParts.pop();  
    let decodedString = base64.decode(encodedString); 
    let [username, password] = decodedString.split(':'); 
    req.username = username;
    req.password = password;

    next();
  } else {
    next('Incorrect path chosen');
  }

}

module.exports = basicAuth;