var RSVP = require('rsvp'),
    nock = require('nock'),
    config = require('../lib/config');

config.baseUrl = 'http://test.host';

// If we don't do this, RSVP will swallow errors (?!)
//   https://github.com/tildeio/rsvp.js#error-handling
RSVP.on('error', function(err) {
  throw err;
});

// Don't allow real requests!
nock.disableNetConnect();
