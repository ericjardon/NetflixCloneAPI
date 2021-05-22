const express = require("express");
const { db } = require("../db");
require("dotenv").config(); // to load the values specified in .env
const router = express.Router();

const titles = require("../db").db().collection("titles");

// URL Query params: type, title, country

router.get("/", async (req, res) => {
  let results = await titles.find().limit(3).toArray();
  res.status(200).json({ message: "Query OK", data: results });
}); // getAll

router.get("/query/", async (req, res) => {
  const queryString = req.query;

  const query = {};

  if (queryString.type !== "") {
    query.type = queryString.type;
  }

  if (queryString.title !== "") {
    query.title = queryString.title;
  }

  if (queryString.country !== "") {
    query.country = queryString.country;
  }

  console.log("Query to send:", query);
  let results = await titles.find(query).toArray();
  console.log(results);
  // res.status(200).json(result);
});

// STATISTICS

router.get("/stats/", async (req, res) => {
  const queryString = req.query;

  const query = {};

  if (queryString.type !== "") {
    query.type = queryString.type;
  }

  if (queryString.title !== "") {
    query.title = queryString.title;
  }

  if (queryString.country !== "") {
    query.country = queryString.country;
  }

  console.log("Query to send:", query);
  let results = await titles.find(query).count();
  console.log(results);
});

module.exports = router;

// Creation of the index
// titles.createIndex({ cast: "text" });

router.get("/actor/", async (req, res) => {
  const actorName = req.query.cast;
  if (typeof actorName != "string") {
    res.status(500).send("ERROR");
  }
  console.log("Searching actor..", actorName);

  let results = await titles
    .find({ $text: { $search: `"${actorName}"` } })
    .toArray();

  console.log(results);
  res.send("Query for actor");
});
