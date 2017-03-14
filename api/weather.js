console.log(__dirname);
const request = require('request'),
  Forecast = require('forecast'),
  readJson = require('r-json'),
  path = require('path'),
  forecastApiKey = readJson(path.join(__dirname,'/apikeys.json')).forecast,
  googleMapsKey = readJson(path.join(__dirname+'/apikeys.json')).googleMaps;

let lat = "",
    long = "",
    currentTemp = "",
    maxTemp = "",
    min = "";
const weatherObj = {};

//getLocation(function(){})

function getLocation(cb) {

  const coordinates = {};
  console.log(googleMapsKey)
  request.post(
      'https://maps.googleapis.com/maps/api/geocode/json?address=' + 60201 + '&key=' + googleMapsKey,
      { json: { key: 'value' } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              //console.log('yes', JSON.stringify(body));
              console.log(body.results[0].geometry.location)
              coordinates.lat = body.results[0].geometry.location.lat;
              coordinates.long = body.results[0].geometry.location.lng;
              getWeather(coordinates,cb);
          }
      }
  )
}

function getWeather(coordinates,cb) {
  const forecast =  new Forecast({
    service: 'darksky',
    key: forecastApiKey,
    units: 'farenheit',
    cache: true,      // Cache API requests
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
      minutes: 27,
      seconds: 45
    }
  });

  forecast.get([coordinates.lat, coordinates.long], true, function(err, weather) {
    if(err) return console.dir(err);
    console.log(weather.currently.apparentTemperature)
    weatherObj.maxTemp = weather.daily.data[0].temperatureMax;
    weatherObj.minTemp = weather.daily.data[0].temperatureMin;
    weatherObj.currentTemp = weather.currently.apparentTemperature;
    console.log('yo', weatherObj);
    cb(null, weatherObj);
  });
}

module.exports = function(cb) {
  getLocation(cb);
}
