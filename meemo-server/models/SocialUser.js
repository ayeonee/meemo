const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: { type: String, maxlength: 50 },
  userId: { type: String, maxlength: 50, unique: 1 }
});

const SocialUser = mongoose.model("SocialUser", userSchema);
module.exports = { SocialUser };