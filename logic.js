var request = require('request');
var cheerio = require('cheerio');
var m = require('./model.js');

function response(res) {
  res.json({"response": "from server"});
}

function doSetTimeout(res, i) {
 setTimeout(function() { response(res); }, 2500 * i) 
}

function callback(err, resp, body) {
  if (err) {
    throw err;
  }
  $ = cheerio.load(body);
  $('.uiCollapsedList a').each(function () {
    var splittedURL = $(this).attr("href").split(/\/+/g);
    var pgname = splittedURL[splittedURL.length-2];
    if (pgname) {
      m.pgShare.findOne({share: pgname, page: pgLinks}, function (err, data) {
        if (err) console.error(err);
        if (!data) {
          var newPgShare = new m.pgShare({ share: pgname, page: pgLinks, count: 1});
          newPgShare.save(function (err) {
            if (err) return console.error(err);
          });
        } else {
          var newCount = data.count + 1; 
          m.pgShare.update({share: pgname, page: pgLinks}, {count: newCount}, function (err) {
            if (err) return console.error(err);
          });
        }
      });
    }
  });
}


exports.scrape = function (options, res) {
  /*global pgLinks*/pgLinks = options.page;
  /*global postID*/postID = options.postid;
  m.postObj.findOne({ postid: postID, serverid: 1 }, function (err, data) {
        if (err) return console.error(err);
        if (!data) {
          var newPostObj = new m.postObj({ postid: postID, postct: options.url.length, serverid: 1 });
          newPostObj.save(function (err) {
            if (err) return console.error(err);
          });
          for (var i = 0; i < options.url.length; i++) {
    setTimeout(request.bind(null, {url: options.url[i], headers: {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"}}, callback), 2000 * i);
            if (i === options.url.length-1) {
              console.log(i);
              doSetTimeout(res, i);
            }
          }
        } else if (options.url.length > data.postct){
          for (var i = data.postct; i < options.url.length; i++) {
    setTimeout(request.bind(null, {url: options.url[i], headers: {'User-Agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36"}}, callback), 2000 * i);
            if (i === options.url.length-1) {
              console.log(i);
            doSetTimeout(res, i);
          }
        }
          m.postObj.update({ postid: postID, serverid: 1 }, {postct: options.url.length}, function (err) {
            if (err) console.error(err);
          });
        } else {
          res.json({"response": "from server"});
          return console.log("'Share' data already processed");
        }
    });
}