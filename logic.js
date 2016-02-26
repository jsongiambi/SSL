var request = require('request');
var cheerio = require('cheerio');

var options = {
  url : ["https://www.facebook.com/people/Max-Wilcox/100007162036223",
  "https://www.facebook.com/stevensprague.sr?fref=ufi&rc=p",
  "https://www.facebook.com/ronald.poukka?fref=ufi&rc=p",
  "https://www.facebook.com/josh.margulies.77?fref=ufi&rc=p",
  "https://www.facebook.com/bfpritch?fref=ufi&rc=p",
  "https://www.facebook.com/profile.php?id=100009797438200",
  "https://www.facebook.com/william.spencer.75248",
  "https://www.facebook.com/michael.chandler.796569",
  "https://www.facebook.com/profile.php?id=100008983991924",
  "https://www.facebook.com/mark.hanback.58",
  "https://www.facebook.com/lois.lawrence.35",
  "https://www.facebook.com/gdocgeo",
  "https://www.facebook.com/phillip.fleming.7393",
  "https://www.facebook.com/rita.zick.1",
  "https://www.facebook.com/tommy.brown.5496",
  "https://www.facebook.com/keith.grammer.1",
  "https://www.facebook.com/lois.lawrence.35",
  "https://www.facebook.com/triscilla.coronado",
  "https://www.facebook.com/profile.php?id=100007905437716",
  "https://www.facebook.com/kelly.bahendekoning",
  "https://www.facebook.com/phil.roper",
  "https://www.facebook.com/profile.php?id=100009317854856",
  "https://www.facebook.com/Siggymike122",
  "https://www.facebook.com/kathleen.eckels.7",
  "https://www.facebook.com/Tedibear",
  "https://www.facebook.com/vicki.lyon.96",
  "https://www.facebook.com/bob.orner.775",
  "https://www.facebook.com/armengol.cantu.1",
  "https://www.facebook.com/moose5574",
  "https://www.facebook.com/moose5574",
  "https://www.facebook.com/francis.furmanek",
  "https://www.facebook.com/tommy.brown.5496",
  "https://www.facebook.com/refugio.gomez.3990",
  "https://www.facebook.com/chuck.phillips.12327",
  "https://www.facebook.com/thelma.leland",
  "https://www.facebook.com/connie.george.5686"
],
  headers: {
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"
  }
}


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


exports.scrape = function () {
  for (var i = 0; i < options.url.length; i++) {
    setTimeout(request.bind(null, {url: options.url[i], headers: {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"}}, callback), 2000 * i);
  }
}
//
// setTimeout(request.bind(null, options, callback), 10000);
