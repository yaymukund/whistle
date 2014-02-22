var util = require('./support/util'),
    Room = require('../lib/room'),
    Client = require('../lib/client'),
    Track = require('../lib/track'),
    expect = require('expect.js');

describe('Room', function() {
  describe('.create', function() {
    beforeEach(function() {
      util.mockGet('/rooms/67', {
        room: {
          tracks: [{url: 'http://test.host/rock.mp3'}]
        }
      });
    });

    it('returns a new Room instance', function(done) {
      Room.fetch(67).then(function(room) {
        expect(room.url).to.equal('http://test.host/rooms/67');
        expect(room.id).to.equal(67);
        done();
      });
    });

    it('sets the track correctly', function(done) {
      Room.fetch(67).then(function(room) {
        expect(room.track.url).to.equal('http://test.host/rock.mp3');
        expect(room.track.currentTime).to.equal(0);
        done();
      });
    });

    it('creates an empty clients array', function(done) {
      Room.fetch(67).then(function(room) {
        expect(room.clients).to.be.empty();
        done();
      });
    });
  });

  describe('.nextTrack', function() {
    var track = Track.create({url: 'http://test.host/rock.mp3'}),
        room = Room.create(67, track);

    beforeEach(function() {
      util.mockPatch('/rooms/67/next_track', {
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

  describe('.recalculateCurrentTime', function() {
    var track = Track.create({url: 'http://test.host/rock.mp3'}),
        room = Room.create(67, track);

    it('sets to client\'s currentTime if there is one client', function() {
      var client = Client.create();
      client.currentTime = 25;
      room.clients = [client];
      room.recalculateCurrentTime();
      expect(room.track.currentTime).to.equal(25);
    });

    it('averages the clients\' times if there are multiple clients', function() {
      var clients = [1,2,3,4,5].map(function(i) {
        var client = Client.create();
        client.currentTime = i;
        return client;
      });

      room.clients = clients;
      room.recalculateCurrentTime();
      expect(room.track.currentTime).to.equal(3);
    });

  });
});
