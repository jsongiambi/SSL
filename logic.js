var request = require('request');
var cheerio = require('cheerio');
var m = require('./model.js');

function callback(err, resp, body) {
  if (err) {
    throw err;
  }
  var list = [];
  $ = cheerio.load(body);
  $('.uiCollapsedList a').each(function () {
    var splittedURL = $(this).attr("href").split(/\/+/g);
    if (splittedURL[splittedURL.length-2]) {
      console.log(splittedURL[splittedURL.length-2]);
      list.push(splittedURL[splittedURL.length-2]);
    }
  });
  if (list.length > 0) {
    var entry = new m.likeData({links: list, page: pgLinks});
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