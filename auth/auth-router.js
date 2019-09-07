const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth

// original
// router.post('/register', (req, res) => {
//   let user = req.body;
//   const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
//   user.password = hash;

//   Users.add(user)
//     .then(saved => {
//       res.status(201).json(saved);
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
         // add info about user to our session
         req.session.user = user;
      // created a session
      // send back a cookie that corresponds to the session DONE AUTOMAGICALLY
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// original
// router.post('/login', (req, res) => {
//   let { username, password } = req.body;

//   Users.findBy({ username })
//     .first()
//     .then(user => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         res.status(200).json({
//           message: `Welcome ${user.username}!`,
//         });
//       } else {
//         res.status(401).json({ message: 'Invalid Credentials' });
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // add info about user to our session
        req.session.user = user;
      // created a session
      // send back a cookie that corresponds to the session DONE AUTOMAGICALLY
        res.status(200).json({
          message: `Welcome ${user.username}, have a cookie!`,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.json({
          message: "People checkin, but they don't check out."
        });
      } else {
        res.end()
      }
    })
  }
});

module.exports = router;