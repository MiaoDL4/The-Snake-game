const mongoose = require('mongoose');

const { Schema } = mongoose;

const merchSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
  },
  modifier: {
    type: String,
    required: true,
  },
});

const Merch = mongoose.model('Merch', merchSchema);

module.exports = Merch;