exports.start = function(port, done) {
  var io = require('socket.io').listen(port, done),
      Client = require('./lib/client');

  io.sockets.on('connection', function(socket) {
    var client = Client.create(socket);

    socket.on('join_room', client.joinRoom.bind(client));
    socket.on('progress', client.progress.bind(client));
    socket.on('done_track', client.doneTrack.bind(client));
  });

  return io.server;
};

// http://nodejs.org/api/modules.html#modules_accessing_the_main_module
if (require.main === module) {
  exports.start(3001, null);
}
