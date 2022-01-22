const Rating = require("../models/Rating");

module.exports = {
  async store(req, res) {
    //getting both rated and aimed rating user
    const ratingUser = req.user;
    const { rating, ratedUser } = req.params;

    //getting average rating
    const alreadyRated = await Rating.getAlreadyRated(ratingUser, ratedUser);

    //return error case user already rated aimed user
    if ((await alreadyRated.alreadyRated) === true)
      return res
        .status(401)
        .send({ message: "You already rated this user", ok: false });

    //return error case rating is under 0 or over 5
    if (rating < 0 || rating > 5)
      return res.status(400).send({ message: "An error occurs", ok: false });

    await Rating.create({
      rating,
      ratedUser,
      ratingUser,
    }).then(() => {
      return res.status(200).send({ ok: true });
    });
  },
};
