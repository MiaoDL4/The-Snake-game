const mongoose = require('mongoose');

const { Schema } = mongoose;

const purchasesSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  product:
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
});

const Purchases = mongoose.model('Purchases', purchasesSchema);

module.exports = Purchases;
