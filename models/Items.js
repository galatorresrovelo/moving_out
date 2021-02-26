const { Schema, model } = require("mongoose");

const itemsSchema = new Schema(
  {
    name: String,
    description: String,

    type: {
      type: String,
      enum: ["Furniture", "Home appliances", "Electronic", "Fragile"],
    },

    url: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },

    width: {
      type: String,
      required: true,
    },

    weight: {
      type: String,
      required: true,
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },

    plaster: {
      type: Boolean,
      default: false,
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

module.exports = model("Items", itemsSchema);
