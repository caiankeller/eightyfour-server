const Rating = require("../models/Rating.js");
const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  async store(req, res) {
    const { username, password, bio, song } = req.body;
    const user = username.toLowerCase();

    const userExists = await User.findOne({ username: user });

    if (!username)
      return res
        .status(401)
        .send({ message: "The username field is empty", ok: false });
    if (userExists)
      return res
        .status(409)
        .send({ message: "The username already exists", ok: false });
    if (!password)
      return res
        .status(401)
        .send({ message: "The password field is empty", ok: false });
    if (password.length < 8)
      return res
        .status(406)
        .send({ message: "The password is too short", ok: false });
    if (password.length > 32)
      return res
        .status(406)
        .send({ message: "The password is too long", ok: false });

    //encrypting password with bcrypt
    bcrypt.hash(password, 10, async (er, hash) => {
      if (er)
        return res.status(401).send({ message: "An error occurs", ok: false });

      await User.create({
        username: user,
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
    const user = req.user;

    await User.findOne({
      username: username,
    })
      .select(["-password"])
      .then(async (getUser) => {
        if (getUser === null)
          return res.status(404).send({
            message: "There is no user with that username",
            ok: false,
          });

        getUser = { ...getUser._doc };
        getUser["rating"] = await Rating.getAverage(getUser._id);
        getUser["userRating"] = await Rating.getAlreadyRated(user, getUser._id);

        return res.status(200).json({ data: getUser, ok: true });
      });
  },
};
