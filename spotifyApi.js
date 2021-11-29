const SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'user-read-recently-played', 'user-top-read']

const express = require('express');
const app = express()

const dotenv = require('dotenv')
dotenv.config();
dotenv.config({ path: '.access.env' });

const fs = require('fs');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URL,
});
spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
   
app.get('/', (req, res) => {
   spotifyApi.getPlaylist("37i9dQZEVXbgRcelnAUs7l").then((list) => {
      res.json(list);
   }).catch(e => {
      console.error(e);
      res.status(500).json(e)
  })
})


app.listen(3000)