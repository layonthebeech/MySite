var readJson = require('r-json'),
      path = require('path'),
      fs = require('fs'),
      createEmail = require('./emailBody'),
      mailcomposer = require('mailcomposer'),
      acct = readJson(`${__dirname}/account.json`),
      date = require('./api/date.js');

var api_key = 'key-e717c1ff99e175315ae282b20283b5c2';
var domain = 'layonthebeech.tk';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


function sendEmail(recipient, info, mailOptions) {
  if(info.reddit) {
    var fileName = date.getDateNoCallback() + '.jpg';
    var filePath = path.join(__dirname,'img', fileName);
    mailOptions.attachments = [{filename: fileName, path: filePath, cid: fileName}]
  }
  var mail = mailcomposer(mailOptions);
  mail.build(function (err, message) {
    if (err) {
      console.log('err1', err);
    }
    mailgun
      .messages()
      .sendMime({
        to: recipient,
        message: message.toString('ascii')
      }, function (err, response) {
        if (err) {
          console.log('err2', err);
        }
      });
  });
}


module.exports = {
  sendEmail: sendEmail
}
