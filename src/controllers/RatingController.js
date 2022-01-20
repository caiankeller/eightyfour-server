const Rating = require("../models/Rating");

module.exports = {
  async store(req, res) {
    const ratingUser = req.user;
    const { rating, ratedUser } = req.params;

    const alreadyRated = await Rating.getAlreadyRated(ratingUser, ratedUser);

    if ((await alreadyRated.alreadyRated) === true)
      return res
        .status(401)
        .send({ message: "You already rated this user", ok: false });

    if (rating < 0 || rating > 5)
      return res.status(400).send({ message: "An error occurs", ok: false });

    await Rating.create({
      rating,
      ratedUser,
      ratingUser,
    }).then(() => {
      return res.status(200).send({ message: "", ok: true });
    });
  },
};
