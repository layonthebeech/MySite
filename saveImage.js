var fs = require('fs'),
  path = require('path'),
  request = require('request'),
  date = require('./api/date.js');

var downloadImage = function(url, imageName, callback){
  request.head(url, function(err, res, body){
    var filename = path.join(__dirname, 'img', imageName);
    request(url).pipe(fs.createWriteStream(filename)).on('close', function(){callback(null,url)});
  });
};



module.exports = function(url, cb) {
  console.log('url', url)
  var imageName = date.getDateNoCallback() + '.jpg';//url.match(/[^\/]+(?=\/$|$)/)[0];
  if(!url.match(/\.jpg|\.jpeg/)) {
    url+='.jpg'
  }
  downloadImage(url, imageName, cb);
}
