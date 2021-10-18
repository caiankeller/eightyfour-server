const express = require("express")

const routes = express.Router()
const UserController = require("./controllers/UserController") 
const AuthController = require("./controllers/AuthController")
const RatingController = require("./controllers/RatingController")

routes.get("/login", UserController.index)
routes.post("/register", UserController.store)
routes.post("/rating/:userRated/:ratedValue", AuthController.verifyJwt, RatingController.update)


module.exports = routes
