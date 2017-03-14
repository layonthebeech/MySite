const fs = require('fs'),
  _ = require('underscore'),
  readJson = require("r-json"),
  async = require('async'),
  email = require('./email.js'),
  tessaEmail = require('./tessaEmail.js');


function apiCall(info) {
  console.log('sdsds')
  let finished = _.after(5, function(){
    console.log('finish', info)
    sendEmail(info)
  });

  //get message
  readJson(`${__dirname}/messages.json`, function(err, messages){
    if(err) {
      console.log('error', err);
    }
    info.message = messages[Math.floor(Math.random() * (Object.keys(messages).length))];
    finished();
  });
  //get weather

  require("./api/weather.js")(function(err, weather) {
    if(err) {
      console.log('error', err);
    }
    info.weather = weather;
    finished();
  });
  //get date
  require('./api/date.js')(function(err, date) {
    if(err) {
      console.log('error', err);
    }
    info.date = date;
    finished();
  });
  //get youtube
  require("./api/youtube.js")(function(err, youtube) {
    if(err) {
      console.log('error', err);
    }
    //console.log('youtube', info);
    info.youtube = youtube;
    finished();
  });
  //get cute
  require("./api/reddit.js")(function(err, reddit) {
    if(err) {
      console.log('error', err);
    }
    info.reddit = reddit;
    finished();
  });
}

function sendEmail(info) {
  console.log('sendEmail', info);
  email.sendEmail(info);
  tessaEmail.sendEmail(info.reddit)
}

module.exports = function(info) {
  console.log('yes')
  apiCall(info);
}
