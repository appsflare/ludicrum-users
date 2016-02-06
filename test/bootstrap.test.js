/**
 * Created by srinath on 24/10/15.
 */
var Sails = require('sails'),
  bootstrap = require('../config/bootstrap').bootstrap,
  connetions = require('../config/connections').connections;
;

// Global before hook
before(function (done) {
  // Lift Sails with test database
  Sails.lift({
    //connetions: connetions,
    //bootstrap: bootstrap,
    log: {
      level: 'error'
    }
  }, function (err, sails) {
    if (err)
      return done(err);

    done(err, sails);

  });
});

// Global after hook
after(function (done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  sails.lower(done);
});
