const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: String,
  bio: String,
  rating: {
    type: Number,
  },
});

module.exports = model("User", UserSchema);