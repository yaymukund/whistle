var Room = require('./room'),
    Client = module.exports = {};

Client.create = function(socket) {
  var client = Object.create(this);
  client.socket = socket;
  return client;
};

Client.getRoom = function(id) {
  var self = this;

  Room.fetch(id).then(function(room) {
    self.socket.emit('room', room);
  });
};
