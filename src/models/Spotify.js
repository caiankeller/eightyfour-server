const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//please, progress with caution 😂
//to understand better what happened here
//i will be just clear, there is layer of jwt token above spotify token
//this way, the spotify token is mininum hided and i have a controll better
//of when spotify token is experied, without increasing complexity
module.exports = {
  async verifyToken(spotifyJWTToken, callback) {
    let er;
    let re;
    jwt.verify(spotifyJWTToken, "spotify", (e, decoded) => {
      if (e) {
        er = true;
      } else {
        re = {
          spotifyToken: decoded.access_token,
          spotifyJWTToken: spotifyJWTToken,
        };
      }
    });
    callback(er, re);
  },
  async createToken() {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    return await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(`${client_id}:${client_secret}`).toString("base64"),
      },
      params: {
        grant_type: "client_credentials",
      },
      json: true,
    })
      .then((response) => {
        const { access_token, expires_in } = response.data;
        const spotifyJWTToken = jwt.sign({ access_token }, "spotify", {
          expiresIn: expires_in,
        });
        return {
          spotifyToken: response.data.access_token,
          spotifyJWTToken: spotifyJWTToken,
        };
      })
      .catch((er) => {
        return er;
      });
  },
  async getContent(search, spotifyToken, callback) {
    await axios
      .get(
        `https://api.spotify.com/v1/search?q=${search}&type=track&limit=20`,
        {
          Accept: "application/json",
          "Content-Type": "application/json",
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        }
      )
      .then((re) => {
        callback(re);
      })
      .catch((er) => {
        callback(er);
      });
  },
};
