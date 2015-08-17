var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var http = require('http');

function JsonGetRequest () {
    EventEmitter.call(this);
}

util.inherits(JsonGetRequest, EventEmitter);

/**
 * Execute a json GET request
 *
 * @param host
 * @param path
 * @param port
 */
JsonGetRequest.prototype.execute = function (host, path, port) {
    var self = this;

    var headers = {
        'Content-Type': 'application/json'
    };

    var options = {
        host: host,
        path: path,
        port: port,
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
        self.respond(err, null);
    });

    req.on('timeout', function () {
        self.respond(err, null);
    });

    req.end();

};

/**
 * Respond by throwing events
 *
 * @param err
 * @param result
 */
JsonGetRequest.prototype.respond = function (err, result) {
    var self = this;

    if (err) {
        self.emit('error', err);
    } else {
        self.emit('success', result);
    }
};

module.exports = JsonGetRequest;