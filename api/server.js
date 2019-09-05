const express = require("express");

// const authRouter = require("../users/users-router.js");
const db = require("../database/dbConfig.js")

const server = express();

server.use(express.json());

// server.use("/api/users", authRouter);

server.get("/", (req, res) => {
  res.send("<h3>Authentication Project</h3>");
});

module.exports = server;
