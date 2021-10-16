const { Schema, model } = require("mongoose");


const CountDownSchema = new Schema({
  username: {
    type: Schema.Types.ObjectId,
  },
  ratedUsername: {
      type: Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    expires: 10,
    default: Date.now,
  },
});


module.exports = model("CountDown", CountDownSchema)