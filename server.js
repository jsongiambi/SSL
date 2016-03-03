var logic = require("./logic.js");
var express = require('express');
var bodyParser = require('body-parser');
var m = require('./model.js');


var app = express();

app.set('port', process.env.PORT);

app.use(bodyParser.json());

app.post('/', function(req, res) {
    logic.scrape(req.body, res);
});

app.get('/test', function(req, res) {
    m.pgShare.find({ "page": "Veteran's Hangout"}, function (err, data) {
        if (err) return console.error(err);
        res.json(data.sort(function (a, b) {
            return parseFloat(a.count) - parseFloat(b.count);
        }));
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Express started");
});

