const spotify = require("../provider/spotify")
const lastFM = require("../provider/lastFM")

async function getSpotifyTrackNameAndCountInLastFM(playlistID) {
    var spotifyTracks = await spotify.getTracksFromPlaylist(playlistID)
    var nameOfplaylist = spotifyTracks.name;
    console.log(nameOfplaylist);
    var countedList = [];

    for (let index = 0; index < spotifyTracks.tracks.length; index++) {
        const spotifyTrack = spotifyTracks.tracks[index];
        const lastFMtracks = await lastFM.fetchTracksWithName(spotifyTrack.track.name);

        var matchingTrackCount = 0

        lastFMtracks.forEach(track => {
            var lastFmArtist = track.artist["#text"];

            for (let artIndex = 0; artIndex < spotifyTrack.track.artists.length; artIndex++) {
                if (spotifyTrack.track.artists[0].name == lastFmArtist) {
                    matchingTrackCount++
                }
            }

        });
        //console.log(spotifyTrack.track.artists[0].name + " - " + spotifyTrack.track.name, "(" + matchingTrackCount + ")");
        var currentElement = {
            artistName: spotifyTrack.track.artists[0].name,
            trackName: spotifyTrack.track.name,
            listenCount: matchingTrackCount,
            spotifyId: spotifyTrack.track.id,
            spotifyWebURL: spotifyTrack.track.external_urls.spotify
        };

        countedList.push(currentElement);
    }
    var res = {
        name: nameOfplaylist,
        tracks: countedList
        
    }
    //console.log(countedList);
    return res;

}

async function getUserPlaylist() {
    console.log("Getting spotify playlists");
    spotifyPlaylists = await spotify.getAllPlaylistFromUser()
    playlists = []

    for (let index = 0; index < spotifyPlaylists.length; index++) {
        const spotifyPlaylist = spotifyPlaylists[index];
        let playlist = {
            playlistName: spotifyPlaylist.name,
            playlistId: spotifyPlaylist.id

        }
        playlists.push(playlist);
    }

    return playlists;
}

module.exports = { getSpotifyTrackNameAndCountInLastFM, getUserPlaylist }
