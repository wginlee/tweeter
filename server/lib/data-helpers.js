"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

function connect(cb) {
  MongoClient.connect(MONGODB_URI, function(err, db) {
    if (err) throw err;
    console.log("Connected correctly to server");

    cb(null, db);
  });
}

// Simulates the kind of delay we see with network or filesystem operations
// const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, callback);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        db.collection("tweets").find().sort(sortNewestFirst).toArray(callback);

    }
  };
}
