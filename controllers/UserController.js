const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { username } = req.headers;
    const loggedUser = await User.findOne({ username: username });
    console.log(loggedUser);

    const user = { name: "caian", bio: "eu odeio papivaras" };
    return res.status(200).json(loggedUser);
  },

  async store(req, res) {
    const { username, password } = req.query;
    const userExists = await User.findOne({ username: username });

    if (userExists) {
      res.status(409).send("already exists");
    }

    const rating = 0

    const user = await User.create({
      username,
      password,
      rating,
    });

    return res.status(200).send("conclude");
  },
};
