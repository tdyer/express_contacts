var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var contacts = require('./routes/contacts');
var auth = require('./routes/auth');

// setup the DB for the environment.
var MongoURI = process.env.MONGOURI || 'mongodb://localhost/testdb';
// setup DB connection.
// BEWARE: could have application code running before the connection is
// actually made.
mongoose.connect(MongoURI, function(err, res){
  if(err) {
    console.log("Error connecting to " + MongoURI + '.' + err);
  }else {
    console.log("Connecting to " + MongoURI);
  }

});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: 'learn-node',
  resave: true,
  saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/account');
passport.use(Account.createStrategy());

// stores user login state in the DB.
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use('/', routes);
app.use('/contacts/', contacts);
app.use('/auth/', auth);

// Not working ??
// logger.token('tgdLogger', function(req, res){
//   return req.body;
// });
//app.use(logger('tgdLogger'));

app.use(logger('dev'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
