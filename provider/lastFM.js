/**
 * LastFM API Operations
 */

const db = require("../db/connection")

// Get tracks collection from DB
const tracks = db.get(process.env.MONGO_TRACK_COL);

// Load LastFM user history into the tracks collection in DB
async function loadLastFmTracksIntoDb(username) {
    console.log("loadLastFmTracksIntoDb");

    //Clear database before loading
    await tracks.drop();

    // Paginate the calls as LastFM allows only 200 items per call
    var pageIndex = 1;
    var totalPagesCount = Infinity;
    while (pageIndex <= totalPagesCount) {
        //Fetch the tracks
        body = await fetchTracks(pageIndex, username);
        console.log(body);
        if(body == false){
            return false
        }
        console.log(body);
        totalPagesCount = body.recenttracks["@attr"].totalPages;

        // Insert the tracks into the DB
        await InsertTracksIntoDb(body.recenttracks.track);
        pageIndex++;
    }
    return true;
}

// Fetch 200 tracks from LastFM user history
function fetchTracks(pageIndex, username) {

    var url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+username+"&api_key="+process.env.LASTFM_API_KEY+"&format=json&limit=200&page=" + pageIndex;
    return new Promise((resolve) => {
        require('https').get(url, function(res) {
            var body = "";
            res.on("data", function(chunk) {
                body += chunk;
            });

            res.on("end", function() {
                var last_fm_response = JSON.parse(body);
                console.log(
                    "Got a response: ",
                    last_fm_response
                );
                resolve(last_fm_response);
            });
        })
        .on("error", function(e) {
            console.log("Got an error: ", e);
            resolve(false)
        });
    })
}

// Insert tracks into DB
async function InsertTracksIntoDb(tracksToInsert) {
    tracks.insert(tracksToInsert);
}

// Fetch tracks from DB with a matching name
async function fetchTracksWithName(trackName) {
    let query = { name: trackName };
    var data = await tracks.find(query);
    return data
}

module.exports = { loadLastFmTracksIntoDb, fetchTracksWithName }