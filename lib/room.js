var Backend = require('./backend'),
    Track = require('./track'),
    Room = module.exports = {};

Room.all = {};

Room.findOrCreate = function(id) {
  if (Room.all[id]) {
    return Room.all[id];
  } else {
    return Room.create(id);
  }
};

Room.create = function(id) {
  var room = Object.create(this);

  room.id = id;
  room.track = Track.create();
  room.clients = [];

  Room.all[id] = room;
  return room;
};

// Instance Methods

Room.newTrack = function() {
  var promise = Backend.nextTrack(this.id),
      self = this;

  promise.then(function() {
    self.track = Track.create();
    self.clients.forEach(function(client) {
      client.done = false;
      client.currentTime = 0;
    });
  });

  return promise;
};

Room.isFinishedPlaying = function() {
  var isFinishedPlaying = true;

  this.clients.forEach(function(client) {
    if (!client.done) {
      isFinishedPlaying = false;
    }
  });

  return isFinishedPlaying;
};

Room.recalculateCurrentTime = function() {
  var sum = this.clients.reduce(function(i, client) {
    return i + client.currentTime;
  }, 0);

  this.track.currentTime = Math.floor(sum / this.clients.length);
};
