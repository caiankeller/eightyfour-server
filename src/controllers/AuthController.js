const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Rating = require("../models/Rating");
require("dotenv").config();

module.exports = {
  async index(req, res, next) {
    const token = req.headers["authorization"];

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
      return res.status(400).send({ message: "user has not found", ok: false });

    bcrypt.compare(password, toVerify.password, async (er, re) => {
      if (er) {
        console.log("trigerred haha babaca");
        return res
          .status(401)
          .send({ message: "user or password incorrect", ok: false });
      }

      if (re) {
        console.log("sexo");
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
        const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        });

        res.status(200).send({ token: token, user: user, ok: true });
      } else {
        return res
          .status(401)
          .send({ message: "user or password incorrect", ok: false });
      }
    });
  },
};
