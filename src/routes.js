const express = require("express");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");
const RatingController = require("./controllers/RatingController");
const SpotifyController = require("./controllers/SpotifyController");

const routes = express.Router();

routes.use("/login", AuthController.store);
routes.post("/register", UserController.store);

routes.get("/search/:username", AuthController.index, UserController.index);
routes.post(
  "/rating/:rating/:ratedUser",
  AuthController.index,
  RatingController.store
);

routes.get("/spotify", SpotifyController.index);

module.exports = routes;
