var util = require('./support/util'),
    Room = require('../lib/room'),
    Track = require('../lib/track'),
    Client = require('../lib/client'),
    expect = require('expect.js');

describe('Room', function() {
  describe('.create', function() {
    var room = Room.create(99);

    it('returns an object with the correct ID', function() {
      expect(room).to.have.property('id', 99)
    });

    it('creates an empty clients array', function() {
      expect(room.clients).to.be.empty();
    });

    it('attaches a blank Track to newly created rooms', function() {
      expect(room.track).to.be.an('object');
    });
  });

  describe('.newTrack', function() {
    var track = Track.create(),
        room = Room.create(67);

    room.track = track;

    beforeEach(function() {
      util.mockPatch('/rooms/67/next_track', {});
    });

    it('changes the track', function(done) {
      room.newTrack().then(function() {
        expect(room.track).to.not.equal(track);
        done();
      });
    });

    it('places you at the beginning of the new track', function(done) {
      room.newTrack().then(function(track) {
        expect(room.track.currentTime).to.equal(0);
        done();
      });
    });
  });

  describe('.isFinishedPlaying', function() {
    var room = Room.create(69);

    for(var i=0; i < 5; i++) {
      var client = Client.create();
      room.clients.push(Client.create());
    }

    it('returns true if every client is done', function() {
      room.clients.forEach(function(client) {
        client.done = true;
      });

      expect(room.isFinishedPlaying()).to.be(true);
    });

    it('returns false if even one client is not done', function() {
      room.clients.forEach(function(client) {
        client.done = true;
      });

      room.clients[0].done = false;
      expect(room.isFinishedPlaying()).to.be(false);
    });
  });

  describe('.recalculateCurrentTime', function() {
    var track = Track.create(),
        room = Room.create(68);

    room.track = track;

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
