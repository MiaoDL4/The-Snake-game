const mongoose = require("mongoose");
const { Schema } = mongoose;

const Purchases = require("./Purchases");

const profileSchema = new Schema({
  win: {
    type: Number,
    min: 0,
    default: 0,
  },
  loss: {
    type: Number,
    min: 0,
    default: 0,
  },
  currency: {
    type: Number,
    min: 0,
    default: 100,
  },
  purchases: [Purchases.schema],
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
