const Spotify = require("../models/Spotify");

module.exports = {
  async index(req, res) {
    const { search } = req.query;
    const { spotify } = req.body;

    await Spotify.verifyToken(spotify, async (er, re) => {
      let spotify;

      if (er) {
        spotify = await Spotify.createToken();
      } else {
        spotify = re;
      }

      await Spotify.getContent(search, spotify.spotifyToken, (re) => {

        res
          .status(200)
          .json({ data: re.data.tracks.items, token: spotify.spotifyJWTToken, ok: true });
      });
    });
  },
};
