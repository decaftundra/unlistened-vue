/**
 * Connection to Mongo database
 */

const monk = require('monk');

const db = monk(process.env.MONGO_URL);

module.exports = db;