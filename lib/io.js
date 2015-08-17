var io = require('socket.io')();

io.on('connection', function (socket) {
    // user has been connected. Some day could do something here if needed to
});

module.exports = io;