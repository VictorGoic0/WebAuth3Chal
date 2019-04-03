const express = require("express");
const helmet = require("helmet");
const authRouter = require("../routers/authRouter.js");
const userRouter = require("../routers/userRouter.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use("/auth", authRouter);
server.use("/api/users", userRouter);

module.exports = server;
