var fs = require('fs'),
  path = require('path'),
  request = require('request'),
  date = require('./api/date.js');

var downloadImage = function(url, imageName, callback){
  request.head(url, function(err, res, body){
    //console.log('content-type:', res.headers['content-type']);
    //console.log('content-length:', res.headers['content-length']);
    let filename = path.join(__dirname, 'img', imageName);
    request(url).pipe(fs.createWriteStream(filename)).on('close', function(){callback(null,url)});

  });
};



module.exports = function(url, cb) {
  console.log('uirl?', url, cb)
  let imageName = date.getDateNoCallback() + '.jpg';//url.match(/[^\/]+(?=\/$|$)/)[0];
  downloadImage(url, imageName, cb);
}
