const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

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

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
         // add info about user to our session
         req.session.user = saved;
      // 1 created a session
      // 2 send back a cookie that corresponds to the session DONE AUTOMAGICALLY
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
// POST localhost:5000/api/auth/register tested in Insomia 

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
      // 1 created a session
      // 2 send back a cookie that corresponds to the session DONE AUTOMAGICALLY
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
// POST localhost:5000/api/auth/login tested in Insomia

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
// GET localhost:5000/api/auth/logout tested in Insomnia
module.exports = router;