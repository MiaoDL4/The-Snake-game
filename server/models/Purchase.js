const mongoose = require("mongoose");

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "Product",
  }],
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
