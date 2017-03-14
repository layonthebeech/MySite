const nodemailer = require('nodemailer'),
      readJson = require('r-json'),
      acct = readJson(`${__dirname}/account.json`);

function sendEmail(info) {
  let transporter =  nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: acct.user,
        pass: acct.pass
    }
  });
  let mailOptions =  {
    from: acct.senderEmail, // sender address
    to: acct.senderEmail, // list of receivers
    subject: "Daily digest for " + info.date, // Subject line
    text: '', // plain text body
    html: '' // html body
  }
  console.log(info);

  mailOptions.html = "<h1>Hi Pat!</h1>" +
                    "<div>" +
                    "<p> The current temperature is: " + info.weather.currentTemp + "</p>" +
                    "<p> The high is: " + info.weather.maxTemp + "</p>" +
                    "<p> The low is: " + info.weather.minTemp +"</p>" +
                    "<p> Your daily message is: " + info.message + "</p>" +
                    "<p> Your cute pic of the day is: <img src='" + info.reddit + "' alt='CutePic'>" + "</p>" +
                    "<p> and your recommended youtube video of the day is " + info.youtube + "</p>" +
                    "</div>";


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = {
  sendEmail: sendEmail
}
