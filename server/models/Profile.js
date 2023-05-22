const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  item: {
    type: String,
  },
  currency:{
    type: Number,
    min: 0,
    default: 100,
  }
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
