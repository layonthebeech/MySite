var http = require('http'),
express = require('express'),
email = require('./createEmail.js'),
port = 8080,
schedule = require('node-schedule');


var app = express();
//var compiledFunction = pug.compileFile('homepage.pug');

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    res.render(
        'homepage',
        { title: 'Hey Hey Hey!', message: 'Yo Yo'})
})

app.listen(port, function () {
    console.log('Example app listening on port 8080!')
})

email({});
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0,new schedule.Range(1, 6)];
rule.hour = 14;
rule.minute = 0;

var j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
  email({});
});
