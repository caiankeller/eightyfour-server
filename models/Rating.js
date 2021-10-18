const { Schema, model } = require("mongoose");

const RatingSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
  },
  ratedUsername: {
      type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    expires: 1800,
    default: Date.now,
  },
});


module.exports = model("Rating", RatingSchema)