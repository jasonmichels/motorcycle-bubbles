var now = require("performance-now");
var host = null;
var iouuid = require('innodb-optimized-uuid');
var http = require('http');

var sendAnalyticsEvent = function (data) {
    var dataString = JSON.stringify(data);

    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': dataString.length
    };

    var options = {
        host: process.env.ANALYTICS_EVENT_HOST,
        path: '/event',
        port: process.env.ANALYTICS_EVENT_PORT,
        method: 'POST',
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
        });
    };

    var req = http.request(options, callback);

    req.on('error', function(err) {
        // For now ignore it if happens since this is not a critical system
    });
    //This is the data we are posting, it needs to be a string or a buffer
    req.write(dataString);
    req.end();
};

/**
 * Circuit breaker class to help with remote system error reporting and some day handling
 *
 * @param commandName
 * @param config
 * @constructor
 */
function CircuitBreaker (commandName, config) {
    var self = this;

    self.commandName = commandName;
    self.config = config;
    self.error = null;
    self.status = 'closed';
    self.requestTime = null;
    self.requestResponseType = null;
    self.startTime = null;
    self.endTime = null;
}

/**
 * Execute the circuit breaker and update the analytics application
 */
CircuitBreaker.prototype.execute = function () {
    var self = this;

    self.requestTime = (self.endTime-self.startTime).toFixed(3);

    var data = {
        _id: iouuid.generate(),
        status: self.status,
        requestTime: self.requestTime,
        requestResponseType: self.requestResponseType,
        commandName: self.commandName,
        host: host,
        createdAt: new Date().getTime()
    };

    if (process.env.ANALYTICS_EVENT_ENABLED == "true") {
        sendAnalyticsEvent(data);
    }
};

/**
 * Success request was made
 */
CircuitBreaker.prototype.success = function () {
    var self = this;

    self.status = 'closed';
    self.requestResponseType = 'success';
    self.stopProfiling();
    self.execute();
};

/**
 * Request was rejected
 *
 * @param err
 */
CircuitBreaker.prototype.rejected = function (err) {
    var self = this;

    self.requestResponseType = 'rejected';
    self.status = 'open';
    self.error = err;
    self.stopProfiling();
    self.execute();
};

/**
 * A timeout occurred
 *
 * @param err
 */
CircuitBreaker.prototype.timeout = function (err) {
    var self = this;

    self.requestResponseType = 'timeout';
    self.status = 'open';
    self.error = err;
    self.stopProfiling();
    self.execute();
};

/**
 * An exception was thrown on the circuit breaker
 *
 * @param err
 */
CircuitBreaker.prototype.exception = function (err) {
    var self = this;

    self.requestResponseType = 'exception';
    self.status = 'open';
    self.error = err;
    self.stopProfiling();
    self.execute();
};

/**
 * Start profiling the application
 */
CircuitBreaker.prototype.startProfiling = function () {
    var self = this;
    self.startTime = now();
};

/**
 * Stop profiling the application
 */
CircuitBreaker.prototype.stopProfiling = function () {
    var self = this;
    self.endTime = now();
};

module.exports = CircuitBreaker;