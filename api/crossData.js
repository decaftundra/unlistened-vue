const spotify = require("../provider/spotify")
const lastFM = require("../provider/lastFM")

async function getSpotifyTrackNameAndCountInLastFM(spotifyAccessToken, playlistID) {
    var spotifyTracks = await spotify.getTracksFromPlaylist(spotifyAccessToken, playlistID)
    var nameOfplaylist = spotifyTracks.name;
    console.log(nameOfplaylist);
    var countedList = [];

    for (let index = 0; index < spotifyTracks.tracks.length; index++) {
        const spotifyTrack = spotifyTracks.tracks[index];
        
        //if the track is local, it is excluded 
        if(spotifyTrack.track.is_local){
            continue
        }

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
            spotifyWebURL: spotifyTrack.track.external_urls.spotify,
            track: spotifyTrack.track,
            

        };

        countedList.push(currentElement);
    }
    var res = {
        name: nameOfplaylist,
        tracks: countedList,
        playlist: spotifyTracks.playlist
        
    }
    //console.log(countedList);
    return res;

}

async function getUserPlaylist(spotifyAccessToken) {
    console.log("Getting spotify playlists");
    spotifyPlaylists = await spotify.getAllPlaylistFromUser(spotifyAccessToken)
    playlists = []

    for (let index = 0; index < spotifyPlaylists.length; index++) {
        const spotifyPlaylist = spotifyPlaylists[index];
        let playlist = {
            playlistName: spotifyPlaylist.name,
            playlistId: spotifyPlaylist.id,
            playlist: spotifyPlaylist,

        }
        playlists.push(playlist);
    }

    return playlists;
}

async function getMe(spotifyAccessToken) {
    var me = await spotify.getMe(spotifyAccessToken)
    return me
}

async function loadLastFmHistory(username) {
    await lastFM.loadLastFmTracksIntoDb(username)
    return
}

module.exports = { getSpotifyTrackNameAndCountInLastFM, getUserPlaylist, loadLastFmHistory, getMe }
