var mongoose = require("mongoose");

mongoose.connect('mongodb://master:Ibookg41234@ds019068.mlab.com:19068/ssl');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


var scrapeSchema = mongoose.Schema({
     links: [String],
     page: String
  });
  
var likeData = mongoose.model("scrape", scrapeSchema);

exports.likeData = likeData;
