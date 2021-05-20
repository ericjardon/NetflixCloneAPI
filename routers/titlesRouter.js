const express = require("express");
require("dotenv").config(); // to load the values specified in .env
const router = express.Router();

// URL Query params: type, name, country

router.get("/", () => {
  console.log("Get all the titles in the database");
}); // getAll

router.get("/query/", (req, res) => {
  const queryString = req.query;
  console.log("Query string", queryString);
  console.log(req.query.type);
  console.log(req.query.name);
  console.log(req.query.country);
  res.send("Your query is stupid");

  const QUERY = req.query;
}); // getAll

/* router.get("/:country", () => {
  console.log("Query of the movies by a given country");
}); */

module.exports = router;
