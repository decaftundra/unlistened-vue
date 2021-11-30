/**
 * Main file for the backend server
 * Load configuration and dependencies
 * Defines all handlers 
 */

const dotenv = require('dotenv')
const cors = require('cors');
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

// Load configuration from .env file
dotenv.config();

// Load api after configuration (as DB connection is initialized within)
const api = require("./api/crossData")

// Spotify token scopes
const spotifyScopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'user-read-recently-played', 'user-top-read', "playlist-read-private"]

// Create an express server
const app = express();
app.use(express.json());
// Allow connections from a host different than the one used to expose the server
// The web client can connect directly to the server 
// Production ready workaround : create a reverse proxy on the frontend server
app.use(cors());

// Get details of a Spotify playlist with listen counts on each track
app.get('/getDiscovery/:id', (req, res) => {
    playlistId = req.params.id
    api.getSpotifyTrackNameAndCountInLastFM(req.app.locals.spotifyAccessToken, playlistId).then((list) => {
        res.json(list);
    }).catch(e => {
        console.error(e);
        res.status(500).json(e)
    })
});

// Get all user Spotify playlists
app.get('/getUserPlaylists', (req, res) => {
    console.log("/getUserPlaylists");
    api.getUserPlaylist(req.app.locals.spotifyAccessToken).then((list) => {
        res.json(list);
    }).catch(e => {
        console.error(e);
        res.status(500).json(e)
    })
});

// Reload LastFM user history into DB
app.get('/loadLastFmHistory', (req, res) => {
    console.log("/loadLastFmHistory");
    console.log(req.query);
    api.loadLastFmHistory(req.query.username).then(() => {
        res.status(200);
    }).catch(e => {
        console.error(e);
        res.status(500).json(e)
    })
});

// Create a Spotify authenticate URL and redirect to it
app.get('/spotifyLogin', (req, res) => {
    console.log("/spotifyLogin");
    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_API_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.CALLBACK_URL,
    });

    var spotifyUrl = spotifyApi.createAuthorizeURL(spotifyScopes)
    res.redirect(spotifyUrl)
});

// Callback endpoint for Spotify auth
// retrieves the access token and puts it in the apps.local (global to the backend server) 
// then redirects to the front end
app.get('/spotifycallback', (req, res) => {
    console.log("/spotifyCallback");
    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_API_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.CALLBACK_URL,
    });
    const { code } = req.query;

    spotifyApi.authorizationCodeGrant(code).then(data => {
        const { access_token, refresh_token } = data.body;
        app.locals.spotifyAccessToken = access_token
        app.locals.SpotifyRefreshToken = refresh_token
        res.redirect("http://localhost:8080/")
    })
});

// Get current logged in Spotify user
app.get('/me', (req, res) => {
    console.log("/me");
    if(app.locals.spotifyAccessToken) {
        api.getMe(app.locals.spotifyAccessToken).then(me => {
            res.json({
                connected: true,
                me: me.body
            })
        }) 
    }else{
        res.json({connected:false})
    }
});

// Start the backend server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
