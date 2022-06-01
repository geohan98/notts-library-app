const express = require("express");
const router = express.Router();
//const Copy = require("../models/Copy");
const { models } = require('../config/database')

//Get All Copies
router.get("/", (req, res) => {
  models.copy.findAll()
    .then((copies) => {
      console.log(copies);
      res.send(copies);
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

//Add New Copy
router.post("/add", (req, res) => {
  let { book_id } = req.body;

  models.copy.create({
    book_id,
  })
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

//Get A Copy By ID
router.get("/:id", (req, res) => {
  models.copy.findByPk(parseInt(req.params.id))
    .then((row) => {
      if (row) {
        res.send(row);
      } else {
        res.sendStatus(400);
      }
    })
    .catch((err) => {
      console.log("Error: " + err);
      res.sendStatus(400);
    });
});

module.exports = router;