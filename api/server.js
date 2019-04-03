const express = require("express");
const helmet = require("helmet");
const authRouter = require("../routers/authRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/auth", authRouter);

module.exports = server;
