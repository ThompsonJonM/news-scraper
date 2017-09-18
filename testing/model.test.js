// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expect = require('chai').expect;
var chai = require('chai');

/* Creation of a test schema using Mongoose
Much like the classwork, the items will be required */
var schemaTest = new Schema ({
    headline: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function(input) {
                return input.length >= 5;
            },
        'Headlines must be longer than 5 characters.'
        ]
    },

    synopsis: {
        type: String,
        required: true
    },

    articleURL: {
        type: String,
        required: true,
        match: [
            /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 
            'Please enter a valid URL'
        ]
    }
});

var modelTest = mongoose.model('modelTest', schemaTest)

describe('Database Test using Mongoose, Mocha, and Chai', function() {
    
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

    describe('Database function test', function() {
        it('Should save a new headline, synopsis, and URL to the db', function(done) {
            var testModel = modelTest ({
                headline: 'Trump Says Offputting Thing, World Not Surprised',
                synopsis: 'Trump did another thing that everyone expected because why not?',
                articleURL: 'https://www.google.com'
            });

            testModel.save(done);
        });

        it('Should validate against bad headline entries into the db', function(done) {
            var badTestHeadline = modelTest ({
                headline: 'The',
                synopsis: 'This is a synopsis',
                articleURL: 'https://www.google.com'
            });

            badTestHeadline.save(function(err) {
                if (err) {
                    return done();
                }

                throw new Error('This should return a headline error');
            });
        });

        it('Should validate against missing synopsis entries into the db', function(done) {
            var badTestSynopsis = modelTest ({
                headline: 'North Korea Discovers World Peace',
                synopsis: '',
                articleURL: 'https://www.google.com'
            });

            badTestSynopsis.save(function(err) {
                if (err) {
                    return done();
                }

                throw new Error('This should return a synopsis error');
            });
        });

        it('Should validate against bad URL input into the db', function(done) {
            var badTestURL = modelTest ({
                headline: 'Mexico Offers to Pay for the Wall',
                synopsis: 'Mexico has spoken with Trump to pay for the wall, surprisingly',
                articleURL: 'haha what'
            });

            badTestURL.save(function(err) {
                if (err) {
                    return done();
                }

                throw new Error('This should return a URL error');
            });
        });


    });

    after(function(done) {
        mongoose.connection.db.dropDatabase(function() {
            mongoose.connection.close(done);
        });
    });

});