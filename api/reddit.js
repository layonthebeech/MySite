var Snoocore = require('snoocore'),
  saveImage = require('../saveImage.js');

/*
   Our new instance associated with a single account.
   It can take in various configuration options.
 */

var reddit = new Snoocore({
  // Unique string identifying the app
  userAgent: '/u/layonthebeech myApp@1.0.0',
  // It's possible to adjust throttle less than 1 request per second.
  // Snoocore will honor rate limits if reached.
  throttle: 300,
  oauth: {
    type: 'implicit',
    key: '_sty7RuHMXLIfA',
    redirectUri: 'http://localhost:3000',
    // The OAuth scopes that we need to make the calls that we
    // want. The reddit documentation will specify which scope
    // is needed for evey call
    scope: [ 'identity', 'read', 'vote' ]
  }
});

function getCute(cb) {
  reddit('/r/aww/top/?sort=top&t=day').get().then(function(result) {
    var i = 0;
    var url = result.data.children[i].data.url;
    while(url.match(/\.gifv|gfycat|\.gif/) && url.match(/\.gifv|gfycat|\.gif/).length > 0 ) {
      i++;
      url = result.data.children[i].data.url;
    }
    saveImage(url, cb);
  });
}

module.exports = function(cb) {
  getCute(cb);
}
