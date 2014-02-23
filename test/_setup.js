var RSVP = require('rsvp'),
    Backend = require('../lib/backend');

Backend.baseUrl = 'http://test.host';

// If we don't do this, RSVP will swallow errors (?!)
//   https://github.com/tildeio/rsvp.js#error-handling
RSVP.on('error', function(err) {
  throw err;
});
