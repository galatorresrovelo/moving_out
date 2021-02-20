const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  loginAccess,
  signupAccess,
  logoutAccess,
  checkSession,
} = require("../controllers/authControllers");

router.post("/login", loginAccess);

router.post("/signup", signupAccess);

router.get("/logout", logoutAccess);

router.get("/session", checkSession);

module.exports = router;
