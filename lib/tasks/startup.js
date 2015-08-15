var minifier = require('../methods/minifier');
var config = require('../../config');

new minifier(config.asset_dirs);