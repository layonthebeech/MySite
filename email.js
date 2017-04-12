var nodemailer = require('nodemailer'),
      readJson = require('r-json'),
      acct = readJson(`${__dirname}/account.json`);

function sendEmail(info) {
  var transporter =  nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: acct.user,
        pass: acct.pass
    }
  });
  var mailOptions =  {
    from: acct.senderEmail, // sender address
    to: acct.senderEmail, // list of receivers
    subject: "Daily digest for " + info.date, // Subject line
    text: '', // plain text body
    html: '' // html body
  }
  console.log(info);

  var pictureFrame = "<p> Your cute pic of the day is: ";
  console.log(info.reddit);
 if(info.reddit.match(/\.jpg/).length > 0) {
  pictureFrame = " <img src='" + info.reddit + "' alt='CutePic'>";
} else if (info.reddit.match(/\.gifv/).length > 0) {
  pictureFrame = "<video poster='//i.imgur.com/YixM4RKh.jpg' preload='auto' autoplay='autoplay' muted='muted' loop='loop' webkit-playsinline='' style='width: 720px; height: 720px;'>" +
                "<source src='" +info.reddit + "type='video/mp4'>" +
                "</video>";
}
pictureFrame += "</p>";

  mailOptions.html = "<h1>Hi Pat!</h1>" +
                    "<div>" +
                    "<p> The current temperature is: " + info.weather.currentTemp + "</p>" +
                    "<p> The high is: " + info.weather.maxTemp + "</p>" +
                    "<p> The low is: " + info.weather.minTemp +"</p>" +
                    "<p> Your daily message is: " + info.message + "</p>" +
                    pictureFrame +
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
