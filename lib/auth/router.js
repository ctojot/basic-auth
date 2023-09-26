'use strict';

// const express = require('express');
// const bcrypt = require('bcrypt');
// const base64 = require('base-64');
// const { Users } = require('./models/users-model.js');

// const router = express.Routers();

// router.get('/signup', async (req, res) => {

//   try {
//     req.body.password = await bcrypt.hash(req.body.password, 10);
//     const record = await Users.create(req.body);
//     res.status(200).json(record);
//   } catch (e) { res.status(403).send('Error Creating User'); }
// });

// router.get('/signin', async (req, res) => {

//   /*
//     req.headers.authorization is : "Basic am9objpmb28="
//     To get username and password from this, take the following steps:
//       - Turn that string into an array by splitting on ' '
//       - Pop off the last value
//       - Decode that encoded string so it returns to user:pass
//       - Split on ':' to turn it into an array
//       - Pull username and password from that array
//   */

//   let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'am9objpmb28=']
//   let encodedString = basicHeaderParts.pop();  // am9objpmb28=
//   let decodedString = base64.decode(encodedString); // "username:password"
//   let [username, password] = decodedString.split(':'); // username, password

//   /*
//     Now that we finally have username and password, let's see if it's valid
//     1. Find the user in the database by username
//     2. Compare the plaintext password we now have against the encrypted password in the db
//        - bcrypt does this by re-encrypting the plaintext password and comparing THAT
//     3. Either we're valid or we throw an error
//   */
//   try {
//     const user = await Users.findOne({ where: { username: username } });
//     const valid = await bcrypt.compare(password, user.password);
//     if (valid) {
//       res.status(200).json(user);
//     }
//     else {
//       throw new Error('Invalid User');
//     }
//   } catch (error) { res.status(403).send('Invalid Login'); }

// });

// module.exports = router;

const express = require('express');
const basicAuth = require('./authMiddleware');
const bcrypt = require('bcrypt');
const Users = require('./userModel');

const router = express.Router();

// Create a POST route for /signup
router.post('/signup', async (req, res) => {
  // Signup Logic
  try {
    const { username, password } = req.body;

    // Validate user data (e.g., check for required fields)
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if the username already exists in the database
    const existingUser = await Users.findOne({ where: { username } });

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user record in the database
    const newUser = await Users.create({
      username,
      password: hashedPassword,
    });

    // Return a 201 status with the created user object
    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors (e.g., validation errors, database errors)
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a POST route for /signin using basicAuth middleware
router.post('/signin', basicAuth, async (req, res) => {
  // Send a JSON object with user information upon successful login
  res.status(200).json({ user: req.user });
});

module.exports = router;