const readJson = require('r-json'),
      path = require('path'),
      fs = require('fs'),
      createEmail = require('./emailBody');
      //nodemailer = require('nodemailer');
      mailcomposer = require('mailcomposer');
      acct = readJson(`${__dirname}/account.json`);

var api_key = 'key-e717c1ff99e175315ae282b20283b5c2';
var domain = '104.131.8.247';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


function sendEmail(recipient, info, mailOptions) {
  console.log("herrryeyy")
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
