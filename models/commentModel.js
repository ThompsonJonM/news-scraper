// Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = Schema({
    comment: {
        type: String
    }
});

var Comments = mongoose.model('Comments', commentSchema)

module.exports = Comments;