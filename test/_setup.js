var RSVP = require('rsvp'),
    config = require('../lib/config');

config.baseUrl = 'http://test.host';

// If we don't do this, RSVP will swallow errors (?!)
//   https://github.com/tildeio/rsvp.js#error-handling
RSVP.on('error', function(err) {
  throw err;
});
