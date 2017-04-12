var google = require('googleapis'),
          fs = require("fs"),
          readJson = require("r-json"),
          youtubeApiKey = readJson(`${__dirname}/apikeys.json`).youtube,
          youtube = google.youtube({
            version: 'v3',
            auth: youtubeApiKey
          });

function getVideo(cb) {
  youtube.playlists.list({
      part: 'id,snippet',
      id: 'PLGLfVvz_LVvReUrWr94U-ZMgjYTQ538nT',
      headers: {}
    }, function (err, data, response) {
      if (err) {
        console.error('Error: ' + err);
      }
      if (data) {
        cb(null, data.items[0].snippet);
      }
      if (response) {
        console.log('Status code: ' + response.statusCode);
      }
    });
}

module.exports = function(cb) {
        getVideo(cb)
}
