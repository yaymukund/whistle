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
};

Client.leaveRoom = function() {
  if (this.room) {
    var i = this.room.clients.indexOf(this);

    if (i !== -1) {
      this.room.clients.splice(i, 1);
    }

    this.room.recalculateCurrentTime();
    this.room.clientsDoneStatusChanged()
    this.room = null;
  }

  this.currentTime = null;
  this.done = false;
};

Client.getCurrentTime = function() {
  this.socket.emit('room_current_time', this.room.track.currentTime);
};

Client.progress = function(currentTime) {
  if (!this.room) { return; }

  this.currentTime = currentTime;
  this.room.recalculateCurrentTime();
};

Client.doneTrack = function() {
  this.done = true;
  this.room.clientsDoneStatusChanged();
};

Client.uploadedTrack = function() {
  this.socket.broadcast.emit('new_track');
};
