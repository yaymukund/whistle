var nock = require('nock');

exports.mockRequest = function(url, body) {
  nock('http://test.host')
    .get(url)
    .reply(200, body);
};
