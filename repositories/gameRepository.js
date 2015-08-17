var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var Mongo = require('../lib/mongodb');
var JsonGetRequest = require('../lib/jsonGetRequest');

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
 */
GameRepository.prototype.getBubbles = function () {
    var self = this;

    var request = new JsonGetRequest();

    request.on('success', function (result) {
        self.respond(null, result);
    }).on('error', function (err) {
        self.respond(null, self.defaultBubbles());
    });

    request.execute(process.env.BUBBLES_BASE_URL, '/api/videos', 80)
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