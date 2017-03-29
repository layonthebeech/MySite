const path = require('path');


function createMessage(info, name) {
  console.log('name', name)
  let emailBody = "<h1>Hi " + name +  "</h1>";
  let pictureFrame = "";
  let fileName = "";
  //let filePath = "";
  if(info.reddit) {
    fileName = info.reddit.match(/[^\/]+(?=\/$|$)/)[0];
    //filePath = path.join(__dirname,'img', fileName);
    pictureFrame+= "<p> Your cute pic of the day is: ";
    pictureFrame += " <img src='cid:" + fileName + "' alt='CutePic' style='width: 720px; height: 720px;'>";
    pictureFrame += "</p>";
    emailBody+= pictureFrame;
  }

  if(info.weather) {
      emailBody += "<p> The current temperature is: " + info.weather.currentTemp + "</p>" +
                  "<p> The high is: " + info.weather.maxTemp + "</p>" +
                  "<p> The low is: " + info.weather.minTemp +"</p>";
  }
  if(info.message) {
      emailBody += "<p> Your daily message is: " + info.message + "</p>";
  }
  if(info.youtube) {
    emailBody  += "<p> and your recommended youtube video of the day is " + info.youtube + "</p>";
  }
  var mailOptions = {
      html: emailBody
  }
  return mailOptions;
}

module.exports = function(info, name) {
  return createMessage(info, name);
}
