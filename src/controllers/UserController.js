const Rating = require("../models/Rating.js");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  async store(req, res) {
    const { username, password, bio, song } = req.body;

    const userExists = await User.findOne({ username: username });

    if (!username)
      return res
        .status(401)
        .send({ message: "username field is empty", ok: false });
    if (userExists)
      return res
        .status(409)
        .send({ message: "username already registered", ok: false });
    if (!password)
      return res
        .status(401)
        .send({ message: "password field is empty", ok: false });
    if (password.length < 8)
      return res
        .status(406)
        .send({ message: "password is too short", ok: false });
    if (password.length > 32)
      return res
        .status(406)
        .send({ message: "password is too long", ok: false });

    bcrypt.hash(password, 10, async (er, hash) => {
      if (er)
        return res.status(401).send({ message: "an error occurs", ok: false });

      await User.create({
        username,
        password: hash,
        bio,
        song,
      }).then(() => {
        return res.status(200).send({ ok: true });
      });
    });
  },
  async index(req, res) {
    const { username } = req.params;
    const ratingUser = req.user;

    var user = await User.findOne({
      username: new RegExp("^" + username + "$", "i"),
    })
      .select(["-password"])
      .then(async (user) => {
        if (user.length === 0)
          return res
            .status(404)
            .send({ message: "no users has found", ok: false });

        const rating = await Rating.getAverage(user._id);
        user = { ...user._doc };
        user["rating"] = rating;
        user["userRating"] = await Rating.getAlreadyRated(ratingUser, user._id);

        return res.status(200).json({ data: user, ok: true });
      });
  },
};
