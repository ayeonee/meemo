const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    // userName: { type: String, maxlength: 50 },
    // userId: { type: String, maxlength: 50, unique: 1 },
    accessToken: {
      type: String,
    }
  });

const SocialUser = mongoose.model("SocialUser", userSchema);
module.exports = { SocialUser };