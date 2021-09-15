const express = require("express");
const router = express.Router();
const categoriesDbHelper = require("../db/queries/categoriesdbHelper");

module.exports = (db) => {
  router.get("/categories", (req, res) => {
    categoriesDbHelper
      .getAllCategories(db)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return router;
};

