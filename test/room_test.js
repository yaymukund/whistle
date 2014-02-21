var util = require('./support/util'),
    Room = require('../lib/room'),
    Track = require('../lib/track'),
    expect = require('expect.js');

describe('Room', function() {
  describe('.create', function() {
    beforeEach(function() {
      util.mockRequest('/rooms/1', {
        room: {
          tracks: [{url: 'http://test.host/rock.mp3'}]
        }
      });
    });

    it('returns a new Room instance', function(done) {
      Room.fetch(1).then(function(room) {
        expect(room.url).to.equal('http://test.host/rooms/1');
        expect(room.id).to.equal(1);
        done();
      });
    });

    it('sets the track correctly', function(done) {
      Room.fetch(1).then(function(room) {
        expect(room.track.url).to.equal('http://test.host/rock.mp3');
        expect(room.track.currentTime).to.equal(0);
        done();
      });
    });

    it('creates an empty clients array', function(done) {
      Room.fetch(1).then(function(room) {
        expect(room.clients).to.be.empty();
        done();
      });
    });
  });

  describe('.nextTrack', function() {
    var track = Track.create({url: 'http://test.host/rock.mp3'}),
        room = Room.create(1, track);

    beforeEach(function() {
      util.mockPatch('/rooms/1/next_track', {
        track: { url: 'http://test.host/jazz.mp3' }
      });
    });

    it('changes the track', function(done) {
      room.nextTrack().then(function(track) {
        expect(room.track).to.equal(track);
        expect(room.track.url).to.equal('http://test.host/jazz.mp3');
        done();
      });
    });

    it('places you at the beginning of the new track', function(done) {
      room.nextTrack().then(function(track) {
        expect(room.track.currentTime).to.equal(0);
        done();
      });
    });
  });
});
