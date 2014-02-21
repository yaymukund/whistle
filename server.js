var io = require('socket.io').listen(3001),
    Client = require('./lib/client');

io.sockets.on('connection', function(socket) {
  var client = Client.create(socket);
  socket.on('join_room', client.joinRoom.bind(client));
  socket.on('progress', client.progress.bind(client));
  socket.on('done_track', client.doneTrack.bind(client));
});
