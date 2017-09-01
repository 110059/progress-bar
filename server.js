var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost/todoAppTest');

//define middlewares - 4 default: morgan/logger, bodyparser, cookieParser, serve-favicon
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/dist');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express); //set view engine
app.use(express.static(__dirname + '/dist')); //provide static files, images, css, js to express
app.use(bodyParser.json()); //parse json request before req.body
//app.use(bodyParser.urlencoded({extended: true/false}));   //true: deep/complex parsing with nested object. false: for simple

//app.use(cookieParser());  //parses Cookie header and populate req.cookies
app.use(logger('dev'));

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

app.get('/createUser', function(req, res) {

  // Create a schema
  var TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    updated_at: { type: Date, default: Date.now },
  });

  // Create a Model based on schema o
  var Todo = mongoose.model('Todo', TodoSchema);

  // save a data
  var todo = new Todo({name:"ved", completed: false, note:"noted jsodijs"});
     todo.save(function(err){
      if(err){
         console.log(err);
       }
       else {
         res.json(todo);
         console.log(todo);
       }
     })
  });

app.get('/getUsers', function(req, res) {

  // Create a schema
  var TodoSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    note: String,
    updated_at: { type: Date, default: Date.now },
  });

  // Create a Model based on schema o
  var Todo = mongoose.model('Todo', TodoSchema);

    var callback = function (err, todos) {
      if (err) return console.error(err);
      console.log(todos)
      res.json(todos);
    };

    // 1 Find all data in the Todo collection
    //Todo.find(callback);

    // 2 Get ONLY completed tasks - conditional
    //Todo.find({completed: false }, callback);

    // 3 Get all tasks ending with `JS`
    //Todo.find({name: /JS$/ }, callback);

    //4 Query chaining -
    /*var oneYearAgo = new Date();
    oneYearAgo.setYear(oneYearAgo.getFullYear() - 1);
    // Get all tasks staring with `Master`, completed
    Todo.find({name: /^Master/, completed: true }, callback);
    // Get all tasks staring with `Master`, not completed and created from year ago to now...
    Todo.find({name: /^Master/, completed: false }).where('updated_at').gt(oneYearAgo).exec(callback);
    */
});
});

app.get('/updateUser', function(req, res) {
    // Create a schema
    var TodoSchema = new mongoose.Schema({
      name: String,
      completed: Boolean,
      note: String,
      updated_at: { type: Date, default: Date.now },
    });

    // Create a Model based on schema
    var Todo = mongoose.model('Todo', TodoSchema);

    var callback = function (err, todos) {
      if (err) return console.error(err);
      console.log(todos)
      res.json(todos);
    };

    // Model.update(conditions, update, [options], [callback])
    // update `multi`ple tasks from complete false to true
    Todo.update({ name: /ved/i }, { completed: false }, { multi: true }, callback);
    //Model.findOneAndUpdate([conditions], [update], [options], [callback])
    Todo.findOneAndUpdate({name: /JS$/ }, {completed: true}, callback);

    //output: { ok: 1, nModified: 1, n: 1 }
});

app.get('/removeUser', function(req, res) {
    // Create a schema
    var TodoSchema = new mongoose.Schema({
      name: String,
      completed: Boolean,
      note: String,
      updated_at: { type: Date, default: Date.now },
    });

    // Create a Model based on schema
    var Todo = mongoose.model('Todo', TodoSchema);

    var callback = function (err, todos) {
      if (err) return console.error(err);
      console.log(todos)
      res.json(todos);
    };

    Todo.remove({ _id: '59a9220d5d84d4d52b893a16' }, callback);
    //output: {"ok":1,"n":1}
});

app.listen(app.get('port'), function() {
  console.log('SliderApp - Server listening on port: ' + app.get('port'))
})
