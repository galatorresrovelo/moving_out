const { Schema, model } = require("mongoose");

const extraServicesSchema = new Schema(
  {
    type: {
      type: String,
      enum: [
        "Painting",
        "Carpenter",
        "Cleaning",
        "Plumber",
        "Electrician",
        "N/A",
      ],
    },
    description: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("extraServices", extraServicesSchema);
