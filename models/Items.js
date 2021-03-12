const { Schema, model } = require("mongoose");

const itemsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: String,

    type: {
      type: String,
      enum: ["Furniture", "Home appliances", "Electronic", "Fragile"],
      required: true,
    },

    url: {
      type: String,
      default:
        "https://image.shutterstock.com/image-vector/add-image-vector-icon-260nw-567401044.jpg",
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
