var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
var urlHelper = require('url');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),    
  // archivedSites: path.join(__dirname,  "/../test/testdata/sites"),  
  list: path.join(__dirname, '../archives/sites.txt')  
  // list: path.join(__dirname, '../test/testdata/sites.txt')  
};s

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, 'utf8', function(err, content) {
    if (err) {
      console.log('there was an error in readListOfUrls');
      // callback(err, null)
     } else {
      var splitURLs = content.split("\n").slice(0, -1);
      cb(null, splitURLs);           // BUT SUPPOSEDLY THIS ONE WORKS?
      // cb(splitURLs);                    // THIS ONE MAKES THE TEST PASS?
    }
  });   
};

exports.isUrlInList = function(target, cb) {
  exports.readListOfUrls(function(err, urlList) {
  if (err) {
    console.log('there was an error in inUrlInList');
    cb(err, null);
  } else {
      if (urlList.indexOf(target) !== -1) {
        cb(null, true); 
        // cb(true);        
      } else {
      cb(null, false);
      }
    }
  });
};

exports.addUrlToList = function(url, cb) {
    var fd = fs.openSync(exports.paths.list, "a+");     
    fs.writeSync(fd, url + '\n');
    fs.closeSync(fd);
    cb(null, true);          
};

exports.isUrlArchived = function(target, cb) {
  fs.readdir(exports.paths.archivedSites, function(err,files) {
    if (err) {
      console.log('there was an error in isUrlArchived');
      cb(err, null);
    } else {
     if (files.indexOf(target) !== -1) {      //////////////////////////////
      cb(null, true);
     } else {
      cb(null, false);       
     }
    }                              
  });
};

exports.downloadUrls = function(listToDownload) {
  listToDownload.forEach(function(website) {    
    httpRequest.get({     
        url: website, 
      }, 
        exports.paths.archivedSites + "/" + website, function() {return;}
      )
  });
};