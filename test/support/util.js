var nock = require('nock'),
    io = require('socket.io-client'),
    server = require('../../server'),
    _server = null;

exports.mockGet = function(url, body) { mockMethod('get', url, body); };
exports.mockRequest = exports.mockGet;
exports.mockPatch = function(url, body) { mockMethod('patch', url, body); };

var mockMethod = function(method, url, body) {
  nock('http://test.host')[method](url)
                          .reply(200, body);
};

exports.createClient = function() {
  return io.connect('http://localhost:3001', {
    transports: ['websockets'],
    'force new connection': true
  });
};

exports.startServer = function(done) {
  if (_server) {
    this.closeServer(function() {
      this.startServer(done);
    });
  } else {
    _server = server.start(3001, done);
  }
};

exports.closeServer = function(done) {
  if (!_server) {
    done();
  } else {
    _server.close(function() {
      _server = null;
      done();
    });
  }
};
