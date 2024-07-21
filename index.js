var express = require('express');
var request = require('request');
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var client_id = "";
var client_secret = "";

//Function to generate a random string for the 'state' parameter, which improves security
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var app = express();
app.use(cors());
app.use(cookieParser());

app.get('/login', function(req, res) {
    
});

app.get('/callback', function(req, res) {

});

console.log('Listening on 8888');
app.listen(8888);