const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
