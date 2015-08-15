var express                 = require('express');
var path                    = require('path');
var favicon                 = require('serve-favicon');
var cookieParser            = require('cookie-parser');
var bodyParser              = require('body-parser');
var config                  = require('./config');
var mustache_express        = require('mustache-express');
var compression             = require('compression')
var app = module.exports    = express();

// Setup tasks/
require('./lib/tasks/asset_compiler');
require('./lib/middleware');
require('./lib/router');

// Environment variables
app.engine('mustache', mustache_express('./views/partials', '.mustache'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');
app.set('env', config.env);

app.debug = function(msg) {
  console.log(msg);
}
// Disable caching
if (app.get('env') == 'dev')
  app.disable('etag');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(compression())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
