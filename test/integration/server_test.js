var util = require('../support/util'),
    expect = require('expect.js');

describe('Server', function() {
  var client;

  beforeEach(function(done) {
    util.startServer(function() {
      client = util.createClient();
      done()
    });
  });

  it('emits new_track when you join_room', function(done) {
    client.once('new_track', function(track) {
      expect(track.url).to.equal('https://archive.org/download/furthur2014-01-20.gefell.pasternak.flac2448/furthur2014-01-20s2t06.mp3');
      expect(track.currentTime).to.equal(0);
      done();
    });

    client.emit('join_room', 1);
  });

  it('records progress', function(done) {
    client.once('new_track', function(track) {
      expect(track.currentTime).to.equal(0);

      client.once('new_track', function(track) {
        expect(track.currentTime).to.equal(25);
        done();
      });

      client.emit('progress', 25);
      client.emit('join_room', 2);
    });

    client.emit('join_room', 2);
  });

  afterEach(function(done) {
    if (client.socket.connected) {
      client.disconnect();
    }

    util.closeServer(done);
  });
});
