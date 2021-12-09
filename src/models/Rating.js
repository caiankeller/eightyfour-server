const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  rating: {
    type: Number,
  },
  ratedUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ratingUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

RatingSchema.statics.getAverage = async function (user) {
  const rate = await this.model("Rating")
    .find({ ratedUser: user })
    .then(async (ratings) => {
      let rate = 0;

      await ratings.map((rating) => {
        rate += rating.rating;
      });
      return rate;
    });
  return rate;
};

RatingSchema.statics.getAlreadyRated = async function (ratingUser, ratedUser) {
  return await this.model("Rating")
    .find({ ratingUser: ratingUser, ratedUser: ratedUser })
    .then((re) => {
      if (re.length > 0) {
        return { alreadyRated: true, rating: re[0].rating };
      } else {
        return { alreadyRated: false };
      }
    });
};

module.exports = mongoose.model("Rating", RatingSchema);
