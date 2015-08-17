var app     = require('../app');
var uti     = require(__methods + 'utilities').prototype;
var routes  = require('../controllers');

for (key in routes) {
  app.use('/' + (key == 'default' ? '' : key), routes[key]);
  
  uti.debug('Attaching controller: ' + key + '  to route: /' + key);
}
