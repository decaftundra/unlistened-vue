const db = require("../db/connection")

const tracks = db.get(process.env.MONGO_TRACK_COL);

async function loadLastFmTracksIntoDb(username, apiKey) {
    //Clear database before loading

    console.log("loadLastFmTracksIntoDb");
    console.log(username, apiKey);

    await tracks.drop();

    var pageIndex = 1;
    var totalPagesCount = Infinity;
    while (pageIndex <= totalPagesCount) {
        body = await fetchTracks(pageIndex, username, apiKey);
        console.log(body);
        if(body == false){
            return false
        }
        console.log(body);
        totalPagesCount = body.recenttracks["@attr"].totalPages;

        await InsertTracksIntoDb(body.recenttracks.track);
        pageIndex++;
    }
    return true;
}

//b968a30db9b544c5a1f8fb0550607239
function fetchTracks(pageIndex, username, apiKey) {

    var url = "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user="+username+"&api_key="+apiKey+"&format=json&limit=200&page=" + pageIndex;
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

async function InsertTracksIntoDb(tracksToInsert) {
    tracks.insert(tracksToInsert);
}

async function fetchTracksWithName(trackName) {
    let query = { name: trackName };
    var data = await tracks.find(query);
    return data
}




module.exports = { loadLastFmTracksIntoDb, fetchTracksWithName }