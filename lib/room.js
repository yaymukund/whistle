var request = require('request'),
    RSVP = require('rsvp'),
    baseUrl = require('./config').baseUrl+'/rooms',
    Track = require('./track'),
    Room = module.exports = {};

Room.all = {};

Room.fetch = function(roomId) {
  var deferred = RSVP.defer(),
      url = baseUrl+'/'+roomId;

  if (Room.all[roomId]) {
    deferred.resolve(Room.all[roomId]);
    return deferred.promise;
  }

  request(url, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    } else {
      var trackJson = JSON.parse(body).room.tracks[0],
          track = Track.create(trackJson),
          room = Room.create(roomId, track);

      Room.all[room.id] = room;

      deferred.resolve(room);
    }
  });

  return deferred.promise;
};

Room.create = function(id, track) {
  var room = Object.create(this);

  room.id = id;
  room.track = track;
  room.url = baseUrl+'/'+id;
  room.clients = [];

  return room;
};

// Instance Methods

Room.nextTrack = function() {
  var deferred = RSVP.defer(),
      url = this.url+'/next_track',
      self = this;

  request.patch(url, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    } else {
      var track = Track.create(JSON.parse(body).track);
      self.track = track;

      deferred.resolve(track);
    }
  });

  return deferred.promise;
};

Room.hasFinishedTrack = function() {
  var hasFinishedTrack = true;

  this.clients.forEach(function(client) {
    if (!client.done) {
      hasFinishedTrack = false;
    }
  });

  return hasFinishedTrack;
};

Room.recalculateCurrentTime = function() {
  var sum = this.clients.reduce(function(i, client) {
    return i + (client.currentTime || 0);
  }, 0);

  this.track.currentTime = Math.floor(sum / this.clients.length);
};
