var Room = require('./room');

function User(socket) {
  this.socket = socket;
};

User.prototype.getRoom = function(id) {
  var self = this;

  Room.fetch(id).then(function(room) {
    self.socket.emit('room', room);
  });
};

module.exports = User;
