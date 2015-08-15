var res = require(__methods + 'resources');

var minifier = function(dirs) {
    this.dirs = dirs;
    
    this.res = new res({
        js: this.dirs.js.dir,
        css: this.dirs.css.dir
    })
    
    this.init();
}

minifier.prototype.init = function() {
    var test = '<div id="test"><div class="name leon"></div></div';

    /*
    for(keys in Object.keys(this.opts)) {
        
    }
    */
}

module.exports = minifier;