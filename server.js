var logic = require("./logic.js");
var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.set('port', process.env.PORT);

app.use(bodyParser.json());

app.post('/', function(req, res) {
    logic.scrape(req.body);
    res.json({"response": "from server"});
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Express started");
});

