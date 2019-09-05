const express = require('express');
const bcryptjs = require('bcryptjs');

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

const router = express();

router.get('/', (req, res) => {
    res.send("It's alive!");
  });


  // this is authentication
router.post('/api/register', (req, res) => {
    let user = req.body;

    user.password = bcryptjs.hashSync(user.password, 12);
  
    Users.add(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  
 router.post('/api/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.get('/api/users', restricted, (req, res) => {
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });

  module.exports = router;