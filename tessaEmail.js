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
    to: "tessa.dettman@gmail.com", // list of receivers
    subject: "Daily digest for " + info.date, // Subject line
    text: '', // plain text body
    html: '' // html body
  }
  console.log(info);

  mailOptions.html = "<h1>Hi Tessa!</h1>" +

                    "<p> Your cute pic of the day is: <img src='" + info.reddit + "' alt='CutePic'>" + "</p>" +

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
