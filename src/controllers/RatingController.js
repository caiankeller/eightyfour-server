const Rating = require("../models/Rating");

module.exports = {
  async store(req, res) {
    const user = req.user;
    const { rating, ratedUser } = req.params;

    const getAlreadyRated = await Rating.getAlreadyRated(user, ratedUser);

    if ((await getAlreadyRated.alreadyRated) === true)
      return res
        .status(401)
        .send({ message: "You already rated this user", ok: false });

    // rating under 0 and over 5 are not allowed
    if (rating < 0 || rating > 5)
      return res.status(400).send({ message: "An error occurred", ok: false });

    await Rating.create({
      rating,
      ratedUser,
      user,
    }).then(() => {
      return res.status(200).send({ ok: true });
    });
  },
};
