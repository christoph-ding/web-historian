var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var htmlfetcher = require('../workers/htmlfetcher')


exports.handleRequest = function (req, res) {
  var archivedSitesPath = path.resolve(__dirname + "/../test/tes  tdata/");

  if (req.method === "GET" && req.url === "/") {
    httpHelpers.serveAssets(res, 'index.html', 'text/html');
  } else if (req.method === "GET" && req.url === "/styles.css") {
    httpHelpers.serveAssets(res, 'styles.css', 'text/css');        
  } else if (req.method === "GET" && req.url === "/loading.html") {
    httpHelpers.serveAssets(res, 'loading.html', 'text/html');        
  } else if (req.method === "GET" ) {
        fs.readFile(archive.paths.archivedSites + '/' + req.url, function(err, content) {
        if (err) {
          res.writeHead(404);
          res.end();        
        } else {
          res.writeHead(200, {'Content-Type':'text/html'})
          res.end(content);
        }
      })         

  } else if (req.method === "POST") {
    var body = ''
    req.on('data', function(chunk) {
      body += chunk;    
    })
    req.on('end', function() {
      var website = body.slice(4); 
      archive.isUrlInList(website, function(err, inList) {
        if (inList) {
          archive.isUrlArchived(website, function(err, archived) {
            if (archived) {
              //go to archived page
              res.writeHead(302, {Location: "http://127.0.0.1:8080/" + website, 'Content-Type':'text/html'});
              res.end();
            } else {
              //go to loading page
              res.writeHead(302, {Location: "http://127.0.0.1:8080/loading.html"});
              res.end();
            }
          });
        } else {
          //write to sites.txt
            archive.addUrlToList(website, function() {
            // htmlfetcher.getURLs()
          //go to loading page
              res.writeHead(302, {Location: "http://127.0.0.1:8080/loading.html"});
              res.end();            
            });
        }
      });
    });  
  }
};
      // does this url exist in our archived Sites?
      //  archive.isUrlArchived(website, function(err, archived) {
        //    console.log(archived)
          // if (!archived) { // check if it is in archive?
          //   // and it is not in our list
          //   if (!archive.isUrlInList(website, function (answer) { console.log(answer); return answer })) {
          //     //console.log("Adding to list")
          //     archive.addUrlToList(website, function() {});
          //   }
          //   res.writeHead(302, {Location: "http://127.0.0.1:8080/loading.html"});
          //   res.end(); 

  
  //   req.on('end', function() {
  //     var website = body.slice(4);     
  //     res.writeHead(302);
  //     var fd = fs.openSync(archives.paths.list, "w");     
  //     fs.writeSync(fd, website + '\n');
  //     fs.closeSync(fd);
  //     res.end();
  //   })
  // }
