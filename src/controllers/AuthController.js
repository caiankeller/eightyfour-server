const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Rating = require("../models/Rating");
require("dotenv").config();

module.exports = {
  async authrization(req, res, next) {
    //cuts off bearer from token
    var token = req.headers["authorization"].split(" ")[1];

    if (!token) res.status(401).send({ message: "token missing", ok: false });
    //jwt verify
    else
      jwt.verify(token, process.env.JWT_SECRET, (er, decoded) => {
        if (er) res.status(401).send({ message: "token invalid", ok: false });
        else req.user = decoded._id;
        next();
      });
  },
  async authentication(req, res) {
    const { username, password } = req.query;
    const toVerify = await User.findOne({ username: username });

    if (toVerify === null)
      return res
        .status(400)
        .send({ message: "There is no user with that username", ok: false });

    //by comparing the password of the username in the database
    //with the password given by the bcrypt user
    bcrypt.compare(password, toVerify.password, async (er, re) => {
      if (er)
        return res
          .status(401)
          .send({ message: "User or password are incorrect", ok: false });
      else if (re) {
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
        //should i avoid use that? this way
        //I can write less while maintaining readability
        var token = `Bearer ${jwt.sign({ _id }, process.env.JWT_SECRET, {
          expiresIn: 86400,
        })}`;

        res.status(200).send({ token: token, user: user, ok: true });
      } else {
        return res
          .status(401)
          .send({ message: "User or password are incorrect", ok: false });
      }
    });
  },
};
