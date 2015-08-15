var res = require('../methods/resources');

var minifier = function(opts) {
    this.opts = opts;
    this.init();
}

minifier.prototype.init = function() {
    for(keys in Object.keys(this.opts)) {
        
    }
}

module.exports = minifier;