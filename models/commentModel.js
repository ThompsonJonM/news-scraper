// Dependencies
var mongoose = require('mongoose');
var Schma = mongoose.Schema;

var commentSchema = Schema({
    comment: {
        type: String
    }
});

var Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments;