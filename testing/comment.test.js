// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expect = require('chai').expect;
var chai = require('chai');

// Creation of a test schema for comments
var schemaTest = new Schema ({
    comment: {
        type: String
    }
});

var commentTest = mongoose.model('commentTest', schemaTest)

describe('DB test before functional testing', function() {

    /* Before the testing can occur, a db connection must occur
    Once connected, finish with done() */
    before(function (done) {
        mongoose.connect('mongodb://localhost/testDatabase');
        var db = mongoose.connection;
        db.on('error', function() {
            console.log('An error has occurred with the connection');
        });
        db.once('open', function() {
            console.log('Connection successful');
            done();
        });
    });

    describe('Function test of comment schema', function() {
        it('Should save a new comment', function(done) {
            var testComment = commentTest({
                body: 'This is a comment to a recently saved article'
            });

            testComment.save(done);
        });
    });
});