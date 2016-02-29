var logic = require("./logic.js");
var express = require('express');
var bodyParser = require('body-parser');
var m = require('./model.js');


var app = express();

app.set('port', process.env.PORT);

app.use(bodyParser.json());

app.post('/', function(req, res) {
    logic.scrape(req.body);
    res.json({"response": "from server"});
});

app.post('/getpages', function(req, res) {
    m.likeData.find({ "page": req.body.name}, 'links', function (err, data) {
        if (err) return console.error(err);
        res.json({ "page": data});
    });
});

app.get('/test', function(req, res) {
    m.likeData.find({ "page": "Veteran's Hangout"}, 'links', function (err, data) {
        if (err) return console.error(err);
        res.json({ "page": data});
    });
});




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Express started");
});

