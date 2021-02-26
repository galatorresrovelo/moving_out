const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    start_Date: Date,
    end_Date: Date,
    price: Number,
    status: {
      type: String,
      enum: [
        "Draft",
        "Submit",
        "Reviewed",
        "Confirmed",
        "Cancelled",
        "Complete",
      ],
      default: "Draft",
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
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Service", serviceSchema);
