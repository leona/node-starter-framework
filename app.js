var express                 = require('express');
var path                    = require('path');
var favicon                 = require('serve-favicon');
var cookieParser            = require('cookie-parser');
var bodyParser              = require('body-parser');
var mustache_express        = require('mustache-express');
var compression             = require('compression')
var app = module.exports    = express();

global.__base       = __dirname + '/';
global.__methods    = __dirname + '/lib/methods/';
global.__lib        = __dirname + '/lib/';
global.__public     = __dirname + '/public/';
global.__tasks      = __dirname + '/lib/tasks/';
global.__env        = 'pro';

var config          = require('./config');

// Setup tasks/
require(__lib + 'middleware');

// Environment variables
app.engine('mustache', mustache_express('./views/partials', '.mustache'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.set('env', config.env);

// Disable caching
if (__env == 'dev') {
  app.disable('etag');
  app.set('view cache', false);
  config.max_age = 0;
} else {
  app.set('view cache', true);
}

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'), { maxAge: config.max_age }));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

require(__lib + 'router');
require(__tasks + 'startup');

// Route assets to compressed versions
if (__env !== 'dev') {
  app.use('/img', express.static(__dirname + '/public/img/build', { maxAge: config.max_age }));
}

app.use('/css', express.static(__dirname + '/public/css/build', { maxAge: config.max_age }));
app.use('/js', express.static(__dirname + '/public/js/build', { maxAge: config.max_age }));
  
// Assign public directory
app.use(express.static(__dirname + '/public', { maxAge: config.max_age }));


//Global view variables
app.use(function (req, res, next) {
   res.locals = config.site;
   next();
});

// catch error stauses and send messages
app.use(function(req, res, next) {
  Object.keys(config.error_msg).forEach(function(key) {
    var err = new Error(config.error_msg[key]);
    err.status = key;
    next(err);
  })
});

// error handlers
app.use(function(err, req, res, next) {
  var status = err.status || 500;
  
  if (app.get('env') !== 'dev')
    err.stack = null;
  
  res.status(status);
  res.render('error', {
    msg: err.message,
    stack: err.stack
    //status: err.status
  });
});
