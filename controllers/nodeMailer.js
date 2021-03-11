const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { catchErrors } = require("../middlewares/index");
const { getTemplate } = require("../template/welcome");

exports.sendConfirmationEmail = function ({ user, userId, userName }) {
  const { subject, email, username } = req.body;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
  async function sendTemplate(req, res) {
    catchErrors(
      await transporter.sendMail({
        from: "Moving Out <email.test2411@gmail.com>",
        to: email,
        subject: "Welcome to Moving Out, please activate your user",
        html: getTemplate(email, username, userId),
      })
    );
    res.status(200).json({ message: "email sent" });
  }
};

router.post("/send-email", (req, res, next) => {
  let { email, subject, message } = req.body;
  res.render("message", { email, subject, message });
});
