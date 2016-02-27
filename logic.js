var request = require('request');
var cheerio = require('cheerio');

function callback(err, resp, body) {
  if (err) {
    throw err;
  }
  $ = cheerio.load(body);
  $('.uiCollapsedList a').each(function () {
    console.log($(this).attr("href"));
  });
}

// for (var i = 0; i < options.url.length; i++) {
//   setInterval(request({url: options.url[i], headers: {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"}}), 5000 * i);
// }


exports.scrape = function (options) {
  for (var i = 0; i < options.url.length; i++) {
    setTimeout(request.bind(null, {url: options.url[i], headers: {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"}}, callback), 2000 * i);
  }
}