const { Schema, model } = require("mongoose");

const addressesSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    // GeoJSON
    origin: {
      // type es una propiedad de location de tipo string.
      type: { type: String },
      coordinates: [Number],
    },
    destination: {
      // type es una propiedad de location de tipo string.
      type: { type: String },
      coordinates: [Number],
    },
    origin_floor: String,
    destination_floor: String,
  },
  {
    timestamps: true,
  }
);
// Con index, le decimos A mongo que una propiedad (en este caso location) se va a comportar o representar de cierta forma (en este caso como un mapa 2D)

addressesSchema.index({ location: "2dsphere" });

module.exports = model("Addresses", addressesSchema);
