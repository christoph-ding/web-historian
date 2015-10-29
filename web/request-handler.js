var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
// var qs = require('querystring');

// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // console.log(req.method + '           ' + req.url);
  var archivedSitesPath = path.resolve(__dirname + "/../test/testdata");
  if (req.method === "GET" && req.url === "/") {
    // httpHelpers.serveAssets(res, 'index.html')
    // httpHelpers.serveAssets(res, '/styles.css')        
    fs.readFile(path.resolve(__dirname + "/public/index.html"), function(err, content) {
          if (err) {
            res.writeHead(404);
            res.end();        
          } else {
            res.writeHead(200, {'Content-Type':'text/html'})
            res.end(content);
          }
        }) 

  } else if (req.method === "GET" && req.url === "/styles.css") {
    // httpHelpers.serveAssets(res, 'index.html')
    // httpHelpers.serveAssets(res, '/styles.css')        
    fs.readFile(path.resolve(__dirname + "/public/styles.css"), function(err, content) {
          // if file is found
          if (err) {
            res.writeHead(404);
            res.end();        
          } else {
            res.writeHead(200, {'Content-Type':'text/css'})
            res.end(content);
          }
        })  
  } else if (req.method === "GET" ) {
    // check if the requested url is in our sites directory
    // var archivedSites = fs.readdir(archivedSitesPath + '/sites', function(err,files) {
    //   console.log('=========================' + files + '================' + req.url.slice(1));
    //   if (files.indexOf(req.url.slice(1)) === -1) {
    //     res.writeHead(404);
    //     res.end()
    //   } else {
        fs.readFile(archivedSitesPath + '/sites' + req.url, function(err, content) {
        if (err) {
          res.writeHead(404);
          res.end();        
        } else {
          res.writeHead(200, {'Content-Type':'text/html'})
          res.end(content);
        }
      })     
    
    // when we are looking for a file that is NOT an asset
    // let's get the url being searched / the "url" put in the for, m
    // console.log(req.url + '     ' + req.url)
    // let's get the correct filepath on the server for that associated...archive


    // if it's there...return it's..."data" (200, correct data, something to get it 'done' in case of error      )


  } else if (req.method === "POST") {
    // extract the input data from the form
    var body = ''
    req.on('data', function(chunk) {
      body += chunk;    
    })

    req.on('end', function() {
      var website = body.slice(4);     
      res.writeHead(302);
      // fs.appendFile("../test/testdata/sites.txt", JSON.stringify(website + '\n'), 'utf8', function(){
      // console.log("==========  " + website)
      //     res.end();
      // });
      var fd = fs.openSync(path.resolve(__dirname + "/../test/testdata/sites.txt"), "w");     
      fs.writeSync(fd, website + '\n');
      fs.closeSync(fd);
      res.end();
    })
  }
  // res.end(archive.paths.list);
};
