const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const db = require('../database/dbConfig.js')

const server = express();

const sessionConfig = {
  name: 'Afganistan Banana Stand',
  secret: 'monsoon demons are messing with my gutters',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true // the browser can't access via JS
  },
  resave: false,
  saveUninitialized: false,
  // where do we store our session?
  store: new KnexSessionStore({
    knex: db,
    tablename: 'sessions',
    sidefieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
}

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));
// creating sessions

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;