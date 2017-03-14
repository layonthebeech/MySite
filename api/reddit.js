var Snoocore = require('snoocore');

/*
   Our new instance associated with a single account.
   It can take in various configuration options.
 */
console.log('reddit')
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

getCute(function(){console.log('yo')});

function getCute(cb) {
  console.log('cuteeee')
  reddit('/r/aww/top').get().then(function(result) {


    console.log('result', result);
    //console.log(JSON.stringify(result.data.children)); // information about a user account
    let url = result.data.children[Math.floor(Math.random() * result.data.children.length)].data.url;
    while(url.match(/(\.gifv|\.gif)/) && url.match(/(\.gifv|\.gif)/).length >=0 ) {
      url = result.data.children[Math.floor(Math.random() * result.data.children.length)].data.url;
    }
    if(url.match(/\.jpg/) && url.match(/\.jpg/).length < 1) {
      url+=".jpg";
    }
    console.log('ul', url);
    cb(null, url);
  });
}

module.exports = function(cb) {
  getCute(cb);
}
