var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.redirect('/index.html');
});

//local test 
app.get('/getData', function(req, res) {
  res.json({
    "buttons": [23, 30, -24, -35],
    "bars": [71, 66, 11, 65],
    "limit": 120
  });
});

app.listen(80, function() {
  console.log('SliderApp - Server listening on port: 80')
})