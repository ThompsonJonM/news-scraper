// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var cheerio = require('cheerio');
var request = require('request');
var mongoose = require('mongoose');

// Add the models
var Webscrapes = require('./models/dataModel')
var Comments = require('./models/commentModel');

// Require mongoose promises to equal JS promises
mongoose.Promise = Promise;

// Initialize
var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/newsScrapes');
var db = mongoose.connection;

// Errors and Connection status
db.on('error', function(error) {
    console.log('An error occurred: ', error);
});

db.once('open', function() {
    console.log('Connection established.');
});

var options = {
    url: 'https://www.fantasypros.com/nfl/player-news.php'
}

request(options, function(error, response, html) {
    
    // Load up the html from fantasypros
    var $ = cheerio.load(html);

    $('div.player-news-item').each(function(i, element) {
        var $a = $(this).children('a');
        var $div = $(this).children('div');

        // Scrape URL
        var articleURL = $a.attr('href');

        // Scrape headline
        var headline = $div.children('a').text();

        // Scrape paragraph(s)
        var synopsis = $div.children('p').text();

        var webScrape = new Webscrapes({
            headline: headline,
            synopsis: synopsis,
            articleURL: articleURL
        });

        webScrape.save(function(err) {
            if (err) {
                console.log('An error occurred while saving this scrape.');
            } else {
                console.log('Scrape saved successfully.');
            }
        })
    });
});

app.get('/', function(req, res) {
    res.status(200).send('ok');

    Webscrapes
        .findOne()
        .exec(function(err, data) {
            if (err) {
                console.log('An error has occurred while attempting to render the saved data');
            } else {
                res.render('index', {
                    headline: data.headline,
                    synopsis: data.synopsis,
                    articleURL: data.articleURL,
                    _id: data._id,
                    comments: data.comments
                });
            }
        });
});



var server = app.listen(3000, function() {
    var PORT = server.address().port;
    console.log('Server running. Listening on ' + PORT);
});

module.exports = server;