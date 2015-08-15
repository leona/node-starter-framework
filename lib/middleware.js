var app = require('../app');
var uti = require('../lib/utilities').prototype;

//Determine if ajax request
app.use(function(req, res, next) {
  if (typeof req.body !== 'undefined' && typeof req.body.ajax_request !== 'undefined' && req.body.ajax_request == 'true') {
    req.isAjax = true;
  } else {
    req.isAjax = false;
  }
  next();
})

app.use(function(req, res, next) {
  uti.debug('Route: ' + req.originalUrl + ' executed at: ' + Date.now());
  
  uti.log('access-log', {
    ip: req.headers['x-forwarded-for'],
    request: req.originalUrl,
    method:  req.method,
    'user-agent': req.headers['user-agent']
  });

  next();
});