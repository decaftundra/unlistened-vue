const SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URL,
});

spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

async function getTracksFromPlaylist(playlistID) {
    var data = await spotifyApi.getPlaylist(playlistID);
    return data.body.tracks.items;
}


//TODO: compute limit (pagination)
async function getAllPlaylistFromUser() {
    var data = await spotifyApi.getUserPlaylists("116821822", { limit: "50" });
    console.log("here");
    return data.body.items
}



module.exports = {
    getTracksFromPlaylist,
    getAllPlaylistFromUser
}