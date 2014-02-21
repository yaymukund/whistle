var Room = require('./room');

function Client(socket) {
  this.socket = socket;
};

Client.prototype.getRoom = function(id) {
  var self = this;

  Room.fetch(id).then(function(room) {
    self.socket.emit('room', room);
  });
};

module.exports = Client;
