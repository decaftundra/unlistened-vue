const dotenv = require('dotenv')
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser')
const SpotifyWebApi = require('spotify-web-api-node');


dotenv.config();
//dotenv.config({ path: '.authSpotify.env' });
dotenv.config({ path: '.access.env' });

const api = require("./api/crossData")
const spotifyScopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private', 'user-read-recently-played', 'user-top-read', "playlist-read-private"]

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser())


app.get('/getDiscovery/:id', (req, res) => {
    playlistId = req.params.id
    api.getSpotifyTrackNameAndCountInLastFM(req.app.locals.spotifyAccessToken, playlistId).then((list) => {
        res.json(list);
    }).catch(e => {
        console.error(e);
        res.status(500).json(e)
    })
});

app.get('/getUserPlaylists', (req, res) => {
    console.log("/getUserPlaylists");
    api.getUserPlaylist(req.app.locals.spotifyAccessToken).then((list) => {
        res.json(list);
    }).catch(e => {
        console.error(e);
        res.status(500).json(e)
    })
});

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


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});
