var io = require('socket.io').listen(3001),
    User = require('./lib/user');

io.sockets.on('connection', function(socket) {
  var user = new User(socket);
  socket.on('get_room', user.getRoom.bind(user));
});
