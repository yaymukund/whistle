var request = require('request'),
    RSVP = require('rsvp'),
    Backend = module.exports = {};

Backend.baseUrl = process.env.MUSIC_ROOM_URL || 'http://localhost:3000';

Backend.nextTrack = function(roomId) {
  var url = this.baseUrl+'/rooms/'+roomId+'/next_track',
      deferred = RSVP.defer();

  request.patch(url, function(error, response, body) {
    if (error) {
      deferred.reject(error);
    } else {
      deferred.resolve();
    }
  });

  return deferred.promise;
};
