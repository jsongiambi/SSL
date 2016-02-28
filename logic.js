var request = require('request');
var cheerio = require('cheerio');
var mongoose = require("mongoose");

mongoose.connect('mongodb://jsongiambi-server1-2635346/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var scrapeSchema = mongoose.Schema({
     links: [String],
     page: String
  });
  
var Scrape = mongoose.model("Scrape", scrapeSchema);


function callback(err, resp, body) {
  if (err) {
    throw err;
  }
  var list = [];
  $ = cheerio.load(body);
  $('.uiCollapsedList a').each(function () {
    console.log($(this).attr("href"));
    list.push($(this).attr("href"));
  });
  if (list.length > 0) {
    var entry = new Scrape({links: list, page: pgLinks});
    entry.save(function (err, fluffy) {
      if (err) return console.error(err);
    });
  }
}


exports.scrape = function (options) {
  /*global pgLinks*/pgLinks = options.page;
  for (var i = 0; i < options.url.length; i++) {
    setTimeout(request.bind(null, {url: options.url[i], headers: {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"}}, callback), 2000 * i);
  }
}