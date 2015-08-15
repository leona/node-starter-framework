var app = require('../app');
var uti = require('../lib/utilities').prototype;
var routes = require('../routes');

for (key in routes) {
  app.use('/' + (key == 'default' ? '' : key), routes[key]);
  
  uti.debug('Attaching controller: ' + key + '  to route: /' + key);
}
