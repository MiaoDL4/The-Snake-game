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
  price: {
    type: Number,
    required: true,
  },
  modifierSnake: {
    type: String,
  },
  modifierBoard: {
    type: String,
  },
  modifierFood: {
    type: String,
  },
});

const Merch = mongoose.model('Merch', merchSchema);

module.exports = Merch;