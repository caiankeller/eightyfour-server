const mongoose = require("mongoose");
const routes = require("./routes");
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.BD_URL);

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`running`);
});