var util         = require("util");
var EventEmitter = require("events").EventEmitter;
var MongoClient = require('mongodb').MongoClient;
var CircuitBreaker = require('../circuitBreakers/circuitBreaker');
var url = 'mongodb://' + process.env.NODE_MONGODB_URL + '/' + process.env.NODE_MONGODB_DATABASE_NAME;
var database = null;

var circuit = new CircuitBreaker('MotorcycleBubblesMongoDB', {max_failures: 5, call_timeout_ms: 1000, reset_timeout_ms: 0});

function Mongo () {
    EventEmitter.call(this);
}

util.inherits(Mongo, EventEmitter);

/**
 * Connect to mongodb
 */
Mongo.prototype.connect = function () {
    var self = this;

    // Connect to database and get the data if not in cache
    MongoClient.connect(url, {
        db: {
            retryMiliSeconds: 800,
            numberOfRetries: circuit.config.max_failures,
            bufferMaxEntries: 100
        },
        server: {
            socketOptions: {
                connectTimeoutMS: circuit.config.call_timeout_ms
            }
        },
        replSet: {},
        mongos: {}
    },function(err, db) {
        if (err) {
            circuit.rejected(err);
            self.emit('error', err);
        } else {
            database = db;
            self.emit('connected', db);
        }
    });
};

/**
 * Execute a request
 *
 * @param collectionKey
 */
Mongo.prototype.execute = function (collectionKey) {
    var self = this;

    circuit.startProfiling();

    if (database) {

        var collection = database.collection(collectionKey);
        circuit.success();
        self.emit('success', collection);

    } else {

        self.on('connected', function (database) {
            var collection = database.collection(collectionKey);
            circuit.success();
            self.emit('success', collection);
        });

        self.connect();
    }
};

module.exports = Mongo;
