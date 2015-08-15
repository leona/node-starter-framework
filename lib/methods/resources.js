var fs = require('fs');
var glob = require('glob');
var uti = require(__methods + 'utilities').prototype;

var resources = function(dirs) {
    this.dirs = dirs;
    this.stre = {};
    this.init();
}

resources.prototype.init = function() {
    uti.forEach(this.dirs, function(key, item) {
        glob(item, function (er, files) {
            if (files.length < 1)
                return uti.debug('No assets found for: ' + item);
                
            uti.debug('Assets for ' + item + ' found:');
            uti.debug(files);
        });
    });
}

module.exports = resources;