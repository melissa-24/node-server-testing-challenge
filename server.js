const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/authRouter.js");
const usersRouter = require("../users/usersRouter.js");
const authenticate = require("../auth/authentication.js");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);


server.get("/", (req, res) => res.json({api: "up"}));

module.exports = server;