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
  res.status(200).json({ message: "Normal Query OK", data: results });
});

// STATISTICS

router.get("/stats/", async (req, res) => {
  const queryString = req.query;

  const query = {};
  let isCountryQuery = false;

  if (queryString.type !== "") {
    query.type = queryString.type;
  }

  if (queryString.release_year !== "") {
    query.release_year = Number(queryString.release_year);
  }

  if (queryString.country !== "") {
    query.country = queryString.country;
    isCountryQuery = true;
  }

  let results;

  console.log("Query to send:", query);
  results = await titles.find(query).count();
  res.status(200).json({ message: "Stats Query OK", data: results });
});

router.get("/actor/", async (req, res) => {
  const actorName = req.query.cast;

  if (typeof actorName != "string") {
    res.status(500).send("ERROR");
  }
  console.log("Searching actor..", actorName);

  let results = await titles
    .find({ $text: { $search: `"${actorName}"` } })
    .toArray();

  res.status(200).json({ message: "Actor Query OK", data: results });
});

router.get("/countries", async (req, res) => {
  let results = await titles.distinct("country");

  res.status(200).json({ message: "Countries query OK", data: results });
});

module.exports = router;

// Creation of the index
// titles.createIndex({ cast: "text" });
