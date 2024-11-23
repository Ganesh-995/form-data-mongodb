const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phon: { type: Number, required: true },
  },
  { timestamps: true }
); // Yeh line add kar de

const User = mongoose.model("User", userSchema);

module.exports = User;
