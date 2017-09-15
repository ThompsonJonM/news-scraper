// Dependencies
var expect = require('chai').expect;
var request = require('supertest');

describe('listen', function() {
    var server;

    beforeEach(function() {
        server = require('./../server');
    });

    afterEach(function() {
        server.close();
    });

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });
});