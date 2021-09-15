const { request } = require("express");
const express = require("express");
const router = express.Router();
const messagesDbHelper = require("../db/queries/messagesDbHelper");

module.exports = (db) => {
  router.post("/:request_id/from/:from_id/to/:to_id/messages", (req, res) => {
    console.log("Received message: ", req.body);
    messagesDbHelper
      .addMessageForRequest(
        db,
        req.params.request_id,
        req.params.from_id,
        req.params.to_id,
        req.body.time_sent,
        req.body.message
      )
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/:request_id/messages", (req, res) => {

    messagesDbHelper
      .getAllMessagesForRequest(db, req.params.request_id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return router;
};
