const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  loginAccess,
  signupAccess,
  logoutAccess,
  checkSession,
  updateUser,
  updateRole,
  updateActive,
  changeAvatar,
} = require("../controllers/authControllers");
const { isAuth, catchErrors } = require("../middlewares/index");

router.post("/login", loginAccess);

router.post("/signup", signupAccess);

router.get("/logout", logoutAccess);

router.get("/session", checkSession);

router.patch("/user/update", isAuth, catchErrors(updateUser));

router.patch("/user/role", isAuth, catchErrors(updateRole));

router.patch("/active/:userId", isAuth, catchErrors(updateActive));

router.post("/avatar/change", isAuth, changeAvatar);

module.exports = router;
