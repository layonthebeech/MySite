var fs = require('fs'),
  path = require('path'),
  request = require('request');

var downloadImage = function(url, imageName, callback){
  request.head(url, function(err, res, body){
    var filename = path.join(__dirname, 'img', imageName);
    request(url).pipe(fs.createWriteStream(filename)).on('close', function(){callback(null,url)});
  });
};



module.exports = function(url, cb) {
  console.log('uirl?', url, cb)
  var imageName = url.match(/[^\/]+(?=\/$|$)/)[0];
  downloadImage(url, imageName, cb);
}
