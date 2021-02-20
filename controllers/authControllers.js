const passport = require("passport");
const User = require("../models/User");

//Scrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

exports.loginAccess = (req, res, next) => {
  passport.authenticate("local", (error, user, errDetails) => {
    if (error) return res.status(500).json({ message: errDetails });
    if (!user) return res.status(401).json({ message: "Unathorized" });

    req.login(user, (error) => {
      if (error) return res.status(500).json({ message: errDetails });
      res.status(200).json(user);
    });
  })(req, res, next);
};

exports.signupAccess = (req, res, next) => {
  const { email, password, username } = req.body;

  if (email === "" || password === "") {
    res.status(400).json({ message: "Indicate email and password" });
    return;
  }
  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.status(400).json({ message: "This email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const harshPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      username,
      password: harshPass,
    });

    newUser
      .save()
      .then(() => {
        res.json(newUser);
      })
      .catch((err) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  });
};

exports.logoutAccess = (req, res) => {
  req.logout();
  res.json({ message: "You are logged out" });
};

exports.checkSession = (req, res) => {
  res.status(200).json(req.user || null);
};