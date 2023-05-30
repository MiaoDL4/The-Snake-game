const mongoose = require("mongoose");

const { Schema } = mongoose;
const Merch = require("./Merch");
const itemSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  merch:
    {
      type: Schema.Types.ObjectId,
      ref: "Merch",
    },
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
