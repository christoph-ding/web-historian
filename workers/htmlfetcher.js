// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var httpRequest = require('http-request')

exports.getURLs = function() {
  archive.readListOfUrls(function(err, splitURLs) {
    archive.downloadUrls(splitURLs);
  });
}