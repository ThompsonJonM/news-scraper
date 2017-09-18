// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var expect = require('chai').expect;
var chai = require('chai');

/* Creation of a test schema using Mongoose
Much like the classwork, the name will be required */
var schemaTest = new Schema ({
    headline: { 
        type: String, 
        required: true,
        unique: true
    }
});

// Collection 'Name' creation
var Headline = mongoose.model('Headline', schemaTest);

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

    // Database test
    describe('Database function test', function() {
        it('Should save a new headline to the db', function(done) {
            var testHeadline = Headline ({
                headline: 'Trump Says Offputting Thing, World Not Surprised'
            });

            testHeadline.save(done);
        });

        it('Should not save incorrect info to the db', function(done) {
            var badTestHeadline = Headline ({
                badHeadline: 'Menzies Proves China Discovered America in 1421'
            });

            badTestHeadline.save(function(err) {
                if (err) {
                    return done();
                }

                throw new Error('This should throw an error');
            });
        });

        it('Should test db find', function(done) {
            Headline.find({ headline: 'Trump Says Offputting Thing, World Not Surprised'}, function(err, headline) {
                if (err) {
                    throw err;
                }

                if(headline.length === 0) {
                    throw new Error('No data has been entered');
                }

                done();
            });
        });
    });

    // Drop DB and close connection following conclusion of tests
    after(function(done) {
        mongoose.connection.db.dropDatabase(function() {
            mongoose.connection.close(done);
        });
    });
});

