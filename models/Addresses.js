const { Schema, model } = require("mongoose");

const ratingSchema = new Schema(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    initial_street: {
      type: String,
    },
    initial_floor: {
      type: String,
    },
    initial_city: {
      type: String,
    },
    initial_neighborhood: {
      type: String,
    },
    initial_state: {
      type: String,
    },
    initial_zipcode: {
      type: String,
    },
    initial_country: {
      type: String,
    },
    final_street: {
      type: String,
    },
    final_floor: {
      type: String,
    },
    final_city: {
      type: String,
    },
    final_neighborhood: {
      type: String,
    },
    final_state: {
      type: String,
    },
    final_zipcode: {
      type: String,
    },
    final_country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
