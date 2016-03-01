var mongoose = require("mongoose");

mongoose.connect('mongodb://master:Ibookg41234@ds019068.mlab.com:19068/ssl');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var pgPostSchema = mongoose.Schema({
    postid: String,
    postct: Number
});

var postObj = mongoose.model("postobj", pgPostSchema);

exports.postObj = postObj;

var pgShareSchema = mongoose.Schema({
     share: String,
     page: String,
     count: Number
});

var pgShare = mongoose.model("pgshare", pgShareSchema);

exports.pgShare = pgShare;


// var scrapeSchema = mongoose.Schema({
//      links: [String],
//      page: String
//   });
  
// var shareData = mongoose.model("scrape", scrapeSchema);

// exports.shareData = shareData;
