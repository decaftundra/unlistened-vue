const SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_API_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: process.env.CALLBACK_URL,
});

spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);

async function getDiscoveryPlaylist() {
    var data = await spotifyApi.getPlaylist('37i9dQZEVXcQlwWsr4LHgz?si=c99f40a8614545e7&nd=1');
    return data.body.tracks.items;
}

module.exports = {
    getDiscoveryPlaylist
}