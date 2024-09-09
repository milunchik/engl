const mongoose = require("mongoose");

const UserShema = new mongoose.Schema({
  id: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  words: {
    type: Array,
    required: true,
    default: [],
  },
});

const User = mongoose.model("User", UserShema);
module.exports = User;
