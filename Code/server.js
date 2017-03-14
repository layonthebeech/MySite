const http = require('http'),
express = require('express'),
email = require('./createEmail.js'),
port = 8080,
schedule = require('node-schedule');

var app = express();
//const compiledFunction = pug.compileFile('homepage.pug');

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render(
        'homepage',
        { title: 'Hey Hey Hey!', message: 'Yo Yo'})
})

app.listen(3000, function () {
    console.log('Example app listening on port' + port)
})


const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0,1,2,3,4,5,6];
rule.hour = 9

const j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
  app({});
});
