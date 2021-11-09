const spotify = require("../provider/spotify")
const lastFM = require("../provider/lastFM")

async function getSpotifyTrackNameAndCountInLastFM() {
    var spotifyTracks = await spotify.getDiscoveryPlaylist()
    var countedList = [];

    for (let index = 0; index < spotifyTracks.length; index++) {
        const spotifyTrack = spotifyTracks[index];
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
    console.log(countedList);
    return countedList;

}

module.exports = { getSpotifyTrackNameAndCountInLastFM }