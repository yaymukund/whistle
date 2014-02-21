var io = require('socket.io').listen(3001),
    Client = require('./lib/client');

io.sockets.on('connection', function(socket) {
  var client = new Client(socket);
  socket.on('get_room', client.getRoom.bind(client));
});
