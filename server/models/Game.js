const mongoose = require("mongoose");

const { Schema } = mongoose;

const gameSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  time:
    {
        type: Number,
        required: true,
    },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
