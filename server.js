const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const server = express();
require("dotenv").config();
server.use(cors());
server.use(express.json());

const titlesRouter = require("./routers/titlesRouter.js");

server.use("/titles", titlesRouter);

module.exports = server;
