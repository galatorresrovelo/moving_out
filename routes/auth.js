const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  loginAccess,
  signupAccess,
  logoutAccess,
  checkSession,
  updateUser,
} = require("../controllers/authControllers");
const { isAuth, catchErrors } = require("../middlewares/index");

router.post("/login", loginAccess);

router.post("/signup", signupAccess);

router.get("/logout", logoutAccess);

router.get("/session", checkSession);

router.patch("/user/update", isAuth, catchErrors(updateUser));

module.exports = router;
