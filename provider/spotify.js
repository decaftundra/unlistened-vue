/**
 * Spotify API Operations
 */

const SpotifyWebApi = require('spotify-web-api-node');

// Creates a Spotify client instance with a given access token
function getClient(token){
    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_API_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        redirectUri: process.env.CALLBACK_URL,
    });
    
    spotifyApi.setAccessToken(token);
    return spotifyApi;
}

// Get tracks for a given Spotify playlist
async function getTracksFromPlaylist(spotifyAccessToken, playlistID) {
    var spotifyApi = getClient(spotifyAccessToken);

    var playlist = {
        name: "",
        tracks: []
    }
    var data = await spotifyApi.getPlaylist(playlistID);
    playlist.tracks = data.body.tracks.items
    playlist.name = data.body.name
    playlist.playlist = data.body
    return playlist ;
}

// Get user Spotify playlists
//TODO: Paginates if user has more than 50 playlists
async function getAllPlaylistFromUser(spotifyAccessToken) {
    var spotifyApi = getClient(spotifyAccessToken);
    console.log("In spotify provider, getUserPlaylists ");
    var data = await spotifyApi.getUserPlaylists(undefined, { limit: "50" });
    console.log("res", data);
    return data.body.items
}

// Get logged in Spotify user details for a given access token
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
