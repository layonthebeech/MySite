
function createMessage(info, fileName) {
  let pictureFrame = "<p> Your cute pic of the day is: ";
  pictureFrame = " <img src='cid:" + fileName+ "' alt='CutePic' style='width: 720px; height: 720px;'>";
  pictureFrame += "</p>";

  let emailBody = "<h1>Hi Pat!</h1>" +
                    "<div>" +
                    "<p> The current temperature is: " + info.weather.currentTemp + "</p>" +
                    "<p> The high is: " + info.weather.maxTemp + "</p>" +
                    "<p> The low is: " + info.weather.minTemp +"</p>" +
                    "<p> Your daily message is: " + info.message + "</p>" +
                    "<p> and your recommended youtube video of the day is " + info.youtube + "</p>" +
                    "</div>";
  return emailBody;
}

module.exports = function(info) {
  return createMessage(info);
}
