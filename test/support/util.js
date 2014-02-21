var nock = require('nock');

exports.mockGet = function(url, body) { mockMethod('get', url, body); };
exports.mockRequest = exports.mockGet;
exports.mockPatch = function(url, body) { mockMethod('patch', url, body); };

var mockMethod = function(method, url, body) {
  nock('http://test.host')[method](url)
                          .reply(200, body);
};
