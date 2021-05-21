const { MongoClient } = require("mongodb");
const express = require("express");
const server = express();
require('dotenv').config();

const titlesRouter = require("./routers/titlesRouter.js");


/* async function main() {
  const uri =
    process.env.DB_CONNECTION;

  const client = new MongoClient(uri);
  try {
    const db = await client.connect();
    console.log("Succesful connection to MongoDB");
  } catch (e) {
    console.log(e);
  } finally {
    await client.close(); // why
  }
}
main().catch(console.error("Error en conexión con MongoDB")); */

server.use("/titles", titlesRouter);

module.exports = server;