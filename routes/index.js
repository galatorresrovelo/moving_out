const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { catchErrors } = require("../middlewares/index");

/* GET home page */
router.get("/", (req, res, next) => {
  res.send("Moving Out API");
});

module.exports = router;
