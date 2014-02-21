var request = require('request'),
    RSVP = require('rsvp'),
    baseUrl = 'http://localhost:3000/rooms';

exports.fetch = function(roomId) {
  var deferred = RSVP.defer(),
      url = baseUrl+'/'+roomId;

  request(url, function(error, response, room) {
    if (error) {
      deferred.reject(error);
    } else {
      deferred.resolve(room);
    }
  });

  return deferred.promise;
};
