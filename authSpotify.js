const SpotifyWebApi = require('spotify-web-api-node');
scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'user-read-recently-played']

const express = require('express');
const app = express()

const dotenv = require('dotenv')
dotenv.config({ path: './.authSpotify.env' });

const fs = require('fs');

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URL,
});

app.get('/', (req, res) => {
    var html = spotifyApi.createAuthorizeURL(scopes)
    console.log(html)
        //res.send(html + "&show_dialog=true")
    res.redirect(html)
})

app.get('/callback', async(req, res) => {
    const { code } = req.query;
    //console.log(code)
    try {
        var data = await spotifyApi.authorizationCodeGrant(code)
        const { access_token, refresh_token } = data.body;
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
        console.log("access token:", access_token);
        console.log("refresh token:", refresh_token);

        fs.writeFile('.access.env',
            `SPOTIFY_ACCESS_TOKEN=${access_token}\nSPOTIFY_REFRESH_TOKEN=${refresh_token}`,
            function(err) {
                if (err) return console.log(err);
                console.log('TOKEN SAVED');
            });

        res.send('ok')

    } catch (err) {
        res.send('/#/error/invalid token');
    }
});

app.listen(3000)