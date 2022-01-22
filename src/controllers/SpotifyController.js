const Spotify = require("../models/Spotify");

module.exports = {
  async index(req, res) {
    const { search } = req.params;
    const { spotify } = req.body;

    //verify token from jwt spotify token
    //"jwt token spotify token ???" confuse? in the model i explain it better
    await Spotify.verifyToken(spotify, async (er, re) => {
      let spotify;

      if (er) {
        //if error while verifing token, create a new token
        spotify = await Spotify.createToken();
      } else {
        //return the spotify token in the spotify token
        spotify = re;
      }

      //use the spotify token retuned to fetch songs
      await Spotify.getContent(search, spotify.spotifyToken, (re) => {
        //return the songs and the spotify token as jwt, even jwt recreated or not
        res.status(200).json({
          data: re.data.tracks.items,
          token: spotify.spotifyJWTToken,
          ok: true,
        });
      });
    });
  },
};
