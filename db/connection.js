const monk = require('monk');

// Connection URL
const url = 'localhost:27017/recenttracks';

const db = monk(url);

module.exports = db;