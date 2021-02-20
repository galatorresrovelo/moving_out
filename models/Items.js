const { Schema, model } = require("mongoose");

const itemsSchema = new Schema(
  {
    name: String,
    description: String,

    type: {
      type: String,
      enum: ["Furniture", "Home appliances", "Electronic", "Fragile"],
    },

    image: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      min: 0,
      required: true,
    },

    width: {
      type: Number,
      min: 0,
      required: true,
    },

    weight: {
      type: Number,
      required: true,
    },

    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },

    plaster: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Items", itemsSchema);
