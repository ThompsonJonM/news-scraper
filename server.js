// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var app = express();
var PORT = 3000;

app.listen(PORT, function() {
    console.log('Server running. Listening on ' + PORT);
});