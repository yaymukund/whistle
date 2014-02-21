var Room = require('./room'),
    Client = module.exports = {},
    RSVP = require('rsvp');

Client.create = function(socket) {
  var client = Object.create(this);

  client.socket = socket;
  client.currentTime = null;
  client.done = false

  return client;
};

Client.joinRoom = function(id) {
  var self = this;

  Room.fetch(id).then(function(room) {
    self.room = room;
    room.clients.push(self);
    self.socket.emit('new_track', room.track);
  });
};

Client.progress = function(currentTime) {
  this.currentTime = currentTime;
};

Client.doneTrack = function() {
  this.done = true;

  if (this.room.hasFinishedTrack()) {
    this.room.nextTrack();
  }
};
