const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    start_Date: [{ type: Date }],
    end_Date: [{ type: Date }],
    price: Number,
    status: {
      type: String,
      enum: ["Submitted", "Reviewed", "Confirmed"],
      default: "Submitted",
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "items",
      },
    ],
    extra_Services: [
      {
        type: Schema.Types.ObjectId,
        ref: "extra_Services",
      },
    ],
    addresses: {
      type: Schema.Types.ObjectId,
      ref: "Adresses",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Service", serviceSchema);
