/**
 * Created by srinath on 25/10/15.
 */

var assert = require('assert');
var Sails = require('sails').Sails;

var request = require('supertest');

describe('POST /oauth/token', function () {
  var client = null;
  before(function keepTheClientReady(done) {
    "use strict";
    Client.findOne({'name': 'trustedTestClient'}, function (err, cl) {
      client = cl;
      done();
    });
  })

  it('should respond with a 200 status code', function (done) {

    var body = {
      client_id: client.clientId,
      client_secret: client.clientSecret,
      grant_type: "password",
      password: "password",
      username: "me@gmail.com"
    };

    console.log(JSON.stringify(body));

    request(sails.hooks.http.app)
      .post('/oauth/token')
      .set('Accept', 'application/json')
      .send(body)
      .expect(function (res) {
        console.log(res.text);
      })
      .expect(200, done);

  });


  it('should respond with a 403 status code', function (done) {

    var body = {
      client_id: client.clientId,
      client_secret: client.clientSecret,
      grant_type: "password",
      password: "wrong_password",
      username: "me@gmail.com"
    };

    //console.log(JSON.stringify(body));

    request(sails.hooks.http.app)
      .post('/oauth/token')
      .set('Accept', 'application/json')
      .send(body)
      .expect(function (res) {
        console.log(res.text);
      })
      .expect(403, done);

  });


});

