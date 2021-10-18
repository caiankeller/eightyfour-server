const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = {
  async index(req, res) {
    let errors = [];

    const { username, password } = req.query;
    var toVerifyuser = await User.findOne({ username: username });
    if (toVerifyuser === null)
      return res.status(400).send("user has not found");

    if (toVerifyuser.password !== password)
      return res.status(400).send("user or password invalid");

    const verifiedUser = {
      id: toVerifyuser._id,
      username: toVerifyuser.username,
      rating: toVerifyuser.rating,
      bio: toVerifyuser.bio,
    };

    const id = verifiedUser.id;
    const token = jwt.sign({ id }, "topsecret", {
      expiresIn: 86400,
    });

    res.status(200).json({ auth: true, token: token, user: verifiedUser });
  },

  async store(req, res) {
    let verify = [];

    const { username, password, surePassword } = req.query;
    const userExists = await User.findOne({ username: username });

    if (password.lengh < 8) verify.push({ error: "password so short" });

    if (password.lengh > 32) verify.push({ error: "password so long" });

    if (password !== surePassword)
      verify.push({ error: "password not combine" });

    if (userExists) verify.push({ error: "user already exists" });

    if (verify.length > 0) return res.status(409).json(verify);

    const rating = 3;
    const ratedTimes = 1;

    const user = await User.create({
      username,
      password,
      rating,
      ratedTimes,
    });

    return res.status(200).send("conclude");
  },

  async login(req, res) {},
};
