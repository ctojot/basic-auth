// 'use strict';

// // 3rd Party Resources
// const express = require('express');
// const router = require('./lib/auth/router.js');
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const { Sequelize } = require('sequelize');
// const User = require('./lib/auth/models/users-model.js');
// // Prepare the express app
// const app = express();

// // Process JSON input and put the data on req.body
// app.use(express.json()); // JSON

// const sequelize = new Sequelize(process.env.DATABASE_URL);

// // Process FORM intput and put the data on req.body
// app.use(express.urlencoded({ extended: true }));

// app.post('/signup', async (req, res) => {
//   let username = req.body.username;
//   let password = req.body.password;

//   let encryptedPassword = await bcrypt.hash(password, 10);

//   let user = await User.create({
//     username,
//     password: encryptedPassword,
//   });
//   console.log('NEWLY CREATED USER!!', user);

//   res.status(201).send(user);
// });

// app.post('/signin', async (req, res, next) => {

//   try {

//     // step1 - look at authorization header
//     let encodedCredentials = req.headers.authorization; // Basic asdjfasyfyasg
//     let encodedbase64 = encodedCredentials.split(' ')[1] // asdjfasyfyasg
//     let decoded = base64.decode(encodedbase64); // username:password
//     let [username, password] = decoded.split(':'); // [username, password];

//     //step2 - look for user based on username
//     let userRecord = await User.findOne({ where: { username } });

//     // step3 - compare passwords
//     let isValid = await bcrypt.compare(password, userRecord.password);
//     if (isValid) {
//       res.status(200).send('You made it!');
//     } else {
//       throw new Error('Invalid credentials');
//     }

//   } catch (e) {
//     console.log('Basic auth error:', e);
//     next('Unauthenticated');
//   }

// });

// // make sure our tables are created, start up the HTTP server.
// sequelize.sync()
//   .then(() => {
//     app.listen(3000, () => console.log('server up'));
//   }).catch(e => {
//     console.error('Could not start server', e.message);
//   });

// // index.js
// const server = require('./server');

// // Define the port for your server
// const port = process.env.PORT || 3001;

// // Start the server by calling the start method from the server module
// server.start(port);