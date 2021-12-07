const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    max: 32,
  },
  bio: {
    type: String,
    max: 120,
  },
  song: {
    type: Object,
    title: {
      type: String,
      max: 30,
    },
    artist: {
      type: String,
      max: 30,
    },
    preview: {
      type: String,
      max: 150,
    },
    cover: {
      type: String,
      max: 150,
    },
  },
});

module.exports = model("User", UserSchema);
