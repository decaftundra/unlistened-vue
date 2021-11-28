const lastFm = require("./provider/lastFM")
const dotenv = require('dotenv')
dotenv.config();

lastFm.loadLastFmTracksIntoDb(process.env.LASTFM_API_KEY);