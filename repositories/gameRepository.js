var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var Mongo = require('../lib/mongodb');
var http = require('http');

function GameRepository () {
    EventEmitter.call(this);
}

util.inherits(GameRepository, EventEmitter);

/**
 * End a game by inserting or updating it into the database
 *
 * @param gameId
 * @param json
 */
GameRepository.prototype.endGame = function (gameId, json) {
    var self = this;

    json["_id"] = gameId;

    var database = new Mongo();

    database.on('success', function(collection) {

        collection.updateOne(json, json, {upsert:true}, function(err, result) {
            self.respond(err, result);
        });

    }).on('error', function (err) {
        self.respond(err, null);
    });

    database.execute(gameId);
};

/**
 * API call to bikefree.tv to get list of motorcycles to use as bubbles
 * @TODO Refactor the hard coded data into configuration file or env variables
 */
GameRepository.prototype.getBubbles = function () {
    var self = this;

    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        host: "bikefree.tv",
        path: '/api/videos',
        port: 80,
        method: 'GET',
        headers: headers
    };

    callback = function(response) {
        var statusCode = response.statusCode;
        var headers = JSON.stringify(response.headers);
        response.setEncoding('utf8');

        var responseString = '';
        response.on('data', function (chunk) {
            responseString += chunk;
        });

        response.on('end', function () {
            var resultObject = JSON.parse(responseString);
            self.respond(null, resultObject);
        });
    };

    var req = http.request(options, callback);

    req.on('error', function(err) {
        self.respond(null, self.defaultBubbles());
    });

    req.on('timeout', function () {
        self.respond(null, self.defaultBubbles());
    });

    req.end();
};

/**
 * Get the default bubbles incase something goes wrong
 *
 * @returns {{videos: {thumbnail: string, title: string}[]}}
 */
GameRepository.prototype.defaultBubbles = function () {
    var videoThumbs = [
        {thumbnail: 'https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/93/thumbs/hd--00001.png', title: 'Motorcycle Bubble'},
        {thumbnail: 'https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/92/thumbs/hd--00001.png', title: 'Motorcycle Bubble'},
        {thumbnail: 'https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/91/thumbs/hd--00001.png', title: 'Motorcycle Bubble'},
        {thumbnail: 'https://s3.amazonaws.com/BikeFreeTv-Output/user_videos/2/90/thumbs/hd--00001.png', title: 'Motorcycle Bubble'}
    ];

    return {videos: videoThumbs};
};

/**
 * Respond to the database request by throwing events
 *
 * @param err
 * @param result
 */
GameRepository.prototype.respond = function (err, result) {
    var self = this;

    if (err) {
        self.emit('error', err);
    } else {
        self.emit('success', result);
    }
};

module.exports = GameRepository;