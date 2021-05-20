const { MongoClient } = require("mongodb");
const express = require("express");
const server = express();
const PORT = 3010;
const titlesRouter = require("./routers/titlesRouter.js");

async function main() {
  const uri =
    "mongodb+srv://dbUser:javascript-me@cluster0.fidim.mongodb.net/netflix_titles?retryWrites=true&w=majority";

  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Succesful connection to MongoDB");
  } catch (e) {
    console.log(e);
  } finally {
    await client.close(); // why
  }
}

main().catch(console.error);

server.use("/titles", titlesRouter);
server.listen(PORT, () => console.log("Server is running..."));
