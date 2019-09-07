const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // as long as someone has a username and password
  // that we have already validated
  // they should have access
    if (req.session && req.session.user) {
        next();
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
};
// tested in Insomia

// original
// module.exports = (req, res, next) => {
  // this shouldn't happen
  // grabbing a cookie 
//   const { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
            // then making sure that cookie is valid
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: 'Ran into an unexpected error' });
//       });
//   } else {
//     res.status(400).json({ message: 'No credentials provided' });
//   }
// };