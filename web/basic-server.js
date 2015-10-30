var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var CronJob = require('cron').CronJob;
var htmlfetcher = require('../workers/htmlfetcher');
// Why do you think we have this here?

// HINT: It has to do with what's in .gitignore
initialize("./archives");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  new CronJob('* * * * * *', function(){
    htmlfetcher.getURLs()
    console.log('httpfetching!');
  }, null, true);
  console.log("Listening on http://" + ip + ":" + port);
}

