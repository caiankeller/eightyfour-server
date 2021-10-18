const Rating = require("../models/Rating");
const User = require("../models/User");

module.exports = {
  async index(req, res) {},
  async update(req, res) {
    const username = req.userIdentification;
    const { userRated, ratedValue } = req.params;
    const ratedUsername = userRated;
    const _id = userRated;
    const { rating, ratedTimes } = await User.findOne({ _id: userRated });
    const newRating = rating + (ratedValue - rating) / ratedTimes;

    await User.findByIdAndUpdate(_id, {
      rating: newRating,
      ratedTimes: ratedTimes + 1,
    });
    if (username || ratedUsername || ratedValue > 5)
      return res.status(400).send('fuck u dumbass')

    await Rating.create({
      username,
      ratedUsername,
    });
    return res.status(200).send("conclude :D");
  },
};
