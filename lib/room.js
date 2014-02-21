var request = require('request'),
    RSVP = require('rsvp'),
    config = require('./config'),
    baseUrl = config.baseUrl + '/rooms';

exports.fetch = function(roomId) {
  var deferred = RSVP.defer(),
      url = baseUrl+'/'+roomId;

  request(url, function(error, response, body) {
    if (error) {
      deferred.reject(error);

    } else {
      var room = JSON.parse(body).room;

      deferred.resolve({
        url: room.tracks[0].url,
        currentTime: 0
      });
    }
  });

  return deferred.promise;
};
