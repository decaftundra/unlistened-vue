const SpotifyWebApi = require('spotify-web-api-node');


function getClient(token){
    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_API_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.CALLBACK_URL,
    });
    
    spotifyApi.setAccessToken(token);
    return spotifyApi;
}
async function getTracksFromPlaylist(spotifyAccessToken, playlistID) {
    var spotifyApi = getClient(spotifyAccessToken);

    var playlist = {
        name: "",
        tracks: []
    }
    var data = await spotifyApi.getPlaylist(playlistID);
    playlist.tracks = data.body.tracks.items
    playlist.name = data.body.name
    return playlist ;
}


//TODO: compute limit (pagination)
async function getAllPlaylistFromUser(spotifyAccessToken) {
    var spotifyApi = getClient(spotifyAccessToken);

    console.log("In spotify provider, getUserPlaylists ");
    var data = await spotifyApi.getUserPlaylists(process.env.USER_ID, { limit: "50" });
    console.log("res", data);
    return data.body.items
}

async function getMe(spotifyAccessToken) {
    var spotifyApi = getClient(spotifyAccessToken);

    var data = await spotifyApi.getMe();
    console.log("Me", data);
    return data;
}


module.exports = {
    getTracksFromPlaylist,
    getAllPlaylistFromUser,
    getMe
}
