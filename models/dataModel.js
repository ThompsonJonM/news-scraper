// Model goes here

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WebScrapeSchema = Schema ({
    headline: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function(input) {
                return input.length >= 5;
            },
        'Headlines must be longer than five characters.'
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
    },

    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

var WebScrapes = mongoose.model('WebScrapes', WebScrapeSchema);

module.exports = WebScrapes;