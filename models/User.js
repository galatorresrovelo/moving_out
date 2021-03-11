const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    isActive: {
      type: String,
      default: false,
    },
    password: String,
    avatar: {
      type: String,
      default: "https://www.shankarainfra.com/img/avatar.png",
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["Administrator", "Standard"],
      default: "Standard",
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
