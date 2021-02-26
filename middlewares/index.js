const User = require("../models/User");

exports.catchErrors = (controller) => (req, res, next) =>
  controller(req, res).catch(next);

exports.isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log("No auth");
    res.status(401).json({ message: "Unathorized" });
  }
  next();
};

exports.checkRole = (roles) => (req, res, next) => {
  const { role } = req.user;
  if (roles.includes(rol)) {
    next();
  } else {
    res.status(403).json({
      message:
        "Don't have the permissions to do this, check with your Administrator",
    });
  }
};
