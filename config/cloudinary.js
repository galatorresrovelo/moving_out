const cloudinary = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const cloudinary = cloudinary.config({
  cloud_name: process.env.ClOUDINARY_NAME,
  api_key: process.env.ClOUDINARY_KEY,
  api_secret: process.env.ClOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "moving_out",
  },
});

module.exports = multer({ storage });
