const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Rating = require("../models/Rating");
require("dotenv").config();

module.exports = {
  async index(req, res, next) {
    const token = req.headers["authorization"].split(" ");

    if (!token) res.status(401).send({ message: "token missing", ok: false });
    else
      jwt.verify(token, process.env.JWT_SECRET, (er, decoded) => {
        if (er) res.status(401).send({ message: "token invalid", ok: false });
        else req.user = decoded._id;
        next();
      });
  },
  async store(req, res) {
    const { username, password } = req.query;
    const toVerify = await User.findOne({ username: username });

    if (toVerify === null)
      return res
        .status(400)
        .send({ message: "There is no user with that username", ok: false });

    bcrypt.compare(password, toVerify.password, async (er, re) => {
      if (er) {
        return res
          .status(401)
          .send({ message: "User or password are incorrect", ok: false });
      }

      if (re) {
        const rating = await Rating.getAverage(toVerify._id);

        if (typeof toVerify.song === "undefined") song = "";
        else song = toVerify.song;

        const user = {
          _id: toVerify._id,
          username: toVerify.username,
          bio: toVerify.bio,
          song: song,
          rating: rating,
        };

        const { _id } = user;
        var token = jwt.sign({ _id }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });

        token = `Bearer ${token}`;

        res.status(200).send({ token: token, user: user, ok: true });
      } else {
        return res
          .status(401)
          .send({ message: "User or password are incorrect", ok: false });
      }
    });
  },
};
