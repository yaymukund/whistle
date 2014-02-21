var util = require('./support/util'),
    Room = require('../lib/room'),
    expect = require('expect.js');

describe('Room', function() {
  before(function() {
    util.mockRequest('/rooms/1', {
      room: {
        tracks: [{url: 'http://test.host/rock.mp3'}]
      }
    });
  });

  it('returns the URL and currentTime', function(done) {
    Room.fetch(1).then(function(room) {
      expect(room.url).to.equal('http://test.host/rock.mp3');
      expect(room.currentTime).to.equal(0);
      done();
    });
  });
});
