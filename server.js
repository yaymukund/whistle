exports.start = function(port, done) {
  var io = require('socket.io').listen(port, done),
      Client = require('./lib/client');

  exports.io = io;

  io.sockets.on('connection', function(socket) {
    var client = Client.create(socket);

    socket.on('join_room', client.joinRoom.bind(client));
    socket.on('leave_room', client.leaveRoom.bind(client));
    socket.on('progress', client.progress.bind(client));
    socket.on('done_track', client.doneTrack.bind(client));
    socket.on('disconnect', client.leaveRoom.bind(client));
    socket.on('uploaded_track', client.uploadedTrack.bind(client));
    socket.on('get_current_time', client.getCurrentTime.bind(client));
  });

  return io.server;
};

// http://nodejs.org/api/modules.html#modules_accessing_the_main_module
if (require.main === module) {
  var port = parseInt(process.argv[2], 10) || 3001;
  exports.start(port, null);
}
