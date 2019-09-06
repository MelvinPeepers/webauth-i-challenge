const express = require("express");
const helmet = require('helmet');
const cors = require('cors')
const bcrypt = require('bcryptjs');

const Users = require('./users/users-model.js');

const restricted = require('./auth/restricted-middleware.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send("Server Up!");
});// tested in Insomia

// this is authentication
server.post('/api/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  // user.password = bcryptjs.hashSync(user.password, 12);

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json({ message: 'Registration Error', error });
    });
});// tested in Insomia

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log('db password', user.password);
        console.log('login password', password);
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Login Error' });
    });
});// tested in Insomia

server.get('/api/users', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => res.send({ message: 'Restricted', error }));
});// tested in Insomia


require("dotenv").config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});