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
  var room = Room.findOrCreate(id)

  this.room = room;
  this.currentTime = room.track.currentTime;
  room.clients.push(this);
  this.socket.emit('new_track', room.track.currentTime);
};

Client.progress = function(currentTime) {
  this.currentTime = currentTime;
  this.room.recalculateCurrentTime();
};

Client.doneTrack = function() {
  this.done = true;

  if (this.room.isFinishedPlaying()) {
    this.room.newTrack().then(function() {
      this.socket.emit('new_track', this.room.track);
    });
  }
};

Client.disconnect = function() {
  var i = this.room.clients.indexOf(this);
  if (i !== -1) {
    this.room.clients.splice(i, 1);
  }

  this.room.recalculateCurrentTime();
};
