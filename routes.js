const express = require("express")

const routes = express.Router()
const UserController = require("./controllers/UserController")

routes.get("/login", UserController.index)
routes.post("/register", UserController.store)


module.exports = routes
