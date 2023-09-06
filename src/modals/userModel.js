const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide username"],
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: [true, "Email address taken!"],
    },
    password: {
      type: String,
      required: [true, "please provide password"],
    },
  },
  { timestamp: true }
);
module.exports = mongoose.model("Users", userSchema);
