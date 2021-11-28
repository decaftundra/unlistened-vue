const dotenv = require('dotenv')
const cors = require('cors');
const express = require('express');
dotenv.config();
//dotenv.config({ path: '.authSpotify.env' });
dotenv.config({ path: '.access.env' });

const api = require("./api/crossData")
const lastFm = require("./provider/lastFM")

const app = express();
app.use(express.json());
app.use(cors());

app.get('/getDiscovery/:id', (req, res) => {
    playlistId = req.params.id
    api.getSpotifyTrackNameAndCountInLastFM(playlistId).then((list) => {
        res.json(list);
    }).catch(e => {
        console.error(e);
        res.status(500).json(e)
    })
});

app.get('/getUserPlaylists', (req, res) => {
    console.log("/getUserPlaylists");
    api.getUserPlaylist().then((list) => {
        res.json(list);
    }).catch(e => {
        console.error(e);
        res.status(500).json(e)
    })
});

app.post('/loadLastFmHistory', (req, res) => {
    console.log("/loadLastFmHistory");

    let apiKey = req.body.lastFmApiKey

    lastFm.loadLastFmTracksIntoDb(apiKey)
    res.json({res:"ok"}) 
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});