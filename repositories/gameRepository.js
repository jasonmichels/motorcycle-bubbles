var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var JsonGetRequest = require('../lib/jsonGetRequest');

function GameRepository () {
    EventEmitter.call(this);
}

util.inherits(GameRepository, EventEmitter);


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